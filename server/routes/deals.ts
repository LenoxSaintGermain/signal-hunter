import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { deals } from "../../drizzle/schema";
import { eq, desc, and, or, like, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// Zod validation schemas
const dealFilterSchema = z.object({
  search: z.string().optional(),
  minScore: z.number().min(0).max(100).optional(),
  stage: z.enum(["draft", "lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"]).optional(),
  excludeDrafts: z.boolean().optional(), // Exclude draft stage deals
  draftsOnly: z.boolean().optional(), // Only show draft stage deals
  sortBy: z.enum(["score", "created_at", "price", "revenue"]).default("score"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});

const createDealSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stage: z.enum(["draft", "lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"]),
  score: z.number().min(0).max(100).optional(),
  contactName: z.string().optional(),
  contactType: z.string().optional(),
  revenue: z.number().positive().optional(),
  cashFlow: z.number().optional(),
  sdeMargin: z.number().optional(),
  aiPotential: z.number().min(0).max(100).optional(),
  certAdvantage: z.number().min(0).max(100).optional(),
  opportunityZone: z.boolean().default(false),
  notes: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

const updateDealSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stage: z.enum(["draft", "lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"]).optional(),
  score: z.number().min(0).max(100).optional(),
  contactName: z.string().optional(),
  contactType: z.string().optional(),
  lastContact: z.date().optional(),
  nextAction: z.string().optional(),
  revenue: z.number().positive().optional(),
  cashFlow: z.number().optional(),
  sdeMargin: z.number().optional(),
  aiPotential: z.number().min(0).max(100).optional(),
  certAdvantage: z.number().min(0).max(100).optional(),
  opportunityZone: z.boolean().optional(),
  notes: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

export const dealsRouter = router({
  /**
   * List all deals with filters, pagination, and search
   */
  list: protectedProcedure
    .input(dealFilterSchema)
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { search, minScore, stage, excludeDrafts, draftsOnly, sortBy, sortOrder, limit, offset } = input;

      // Build WHERE conditions
      const conditions = [];
      
      if (search) {
        conditions.push(
          or(
            like(deals.name, `%${search}%`),
            like(deals.industry, `%${search}%`),
            like(deals.location, `%${search}%`)
          )
        );
      }

      if (minScore !== undefined) {
        conditions.push(sql`${deals.score} >= ${minScore}`);
      }

      if (stage) {
        conditions.push(eq(deals.stage, stage));
      }

      // Handle draft filters
      if (excludeDrafts) {
        conditions.push(sql`${deals.stage} != 'draft'`);
      }
      if (draftsOnly) {
        conditions.push(eq(deals.stage, 'draft'));
      }

      // Build ORDER BY
      let orderByClause;
      switch (sortBy) {
        case "score":
          orderByClause = sortOrder === "desc" ? desc(deals.score) : deals.score;
          break;
        case "created_at":
          orderByClause = sortOrder === "desc" ? desc(deals.createdAt) : deals.createdAt;
          break;
        case "price":
          orderByClause = sortOrder === "desc" ? desc(deals.price) : deals.price;
          break;
        case "revenue":
          orderByClause = sortOrder === "desc" ? desc(deals.revenue) : deals.revenue;
          break;
        default:
          orderByClause = desc(deals.score);
      }

      // Execute query
      const dealsList = await db
        .select()
        .from(deals)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(orderByClause)
        .limit(limit)
        .offset(offset);

      // Get total count
      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(deals)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      const total = Number(countResult[0]?.count || 0);

      return {
        deals: dealsList,
        total,
        hasMore: offset + dealsList.length < total,
      };
    }),

  /**
   * Get single deal by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const deal = await db
        .select()
        .from(deals)
        .where(eq(deals.id, input.id))
        .limit(1);

      if (!deal || deal.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });
      }

      return deal[0];
    }),

  /**
   * Create new deal
   */
  create: protectedProcedure
    .input(createDealSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(deals).values({
        ...input,
        userId: ctx.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // For MySQL, insertId is available on the result object
      const insertId = (result as any).insertId;

      return {
        success: true,
        dealId: Number(insertId),
      };
    }),

  /**
   * Update deal
   */
  update: protectedProcedure
    .input(updateDealSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const { id, ...updates } = input;

      // Check if deal exists
      const existing = await db
        .select()
        .from(deals)
        .where(eq(deals.id, id))
        .limit(1);

      if (!existing || existing.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });
      }

      await db
        .update(deals)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(deals.id, id));

      return {
        success: true,
      };
    }),

  /**
   * Delete deal (soft delete by moving to "passed" stage)
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // Check if deal exists
      const existing = await db
        .select()
        .from(deals)
        .where(eq(deals.id, input.id))
        .limit(1);

      if (!existing || existing.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });
      }

      // For now, just delete the record
      // In V2, we can add a "deleted" flag for soft deletes
      await db
        .delete(deals)
        .where(eq(deals.id, input.id));

      return {
        success: true,
      };
    }),

  /**
   * Get pipeline stats (KPIs for dashboard)
   */
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // Get total count
      const totalResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(deals);

      // Get high score count (score >= 80)
      const highScoreResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(deals)
        .where(sql`${deals.score} >= 80`);

      // Get average score
      const avgScoreResult = await db
        .select({ avg: sql<number>`avg(${deals.score})` })
        .from(deals);

      // Get outreach count (deals with lastContact set)
      const outreachResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(deals)
        .where(sql`${deals.lastContact} IS NOT NULL`);

      // Get response count (deals with nextAction set after contact)
      const responseResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(deals)
        .where(sql`${deals.lastContact} IS NOT NULL AND ${deals.nextAction} IS NOT NULL`);

      const total = Number(totalResult[0]?.count || 0);
      const highScore = Number(highScoreResult[0]?.count || 0);
      const avgScore = Number(avgScoreResult[0]?.avg || 0);
      const outreach = Number(outreachResult[0]?.count || 0);
      const responses = Number(responseResult[0]?.count || 0);

      return {
        totalOpportunities: total,
        highScoreCount: highScore,
        averageScore: avgScore / 100, // Convert to 0-1 scale
        outreachSent: outreach,
        responseRate: outreach > 0 ? responses / outreach : 0,
      };
    }),
});
