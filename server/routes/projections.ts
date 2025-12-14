import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { projections } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Performance Projections Router for 5-year financial modeling
 * 
 * Supports three scenario types:
 * - Conservative: Low growth, high risk adjustment
 * - Moderate: Base case with realistic assumptions
 * - Aggressive: High growth, optimistic assumptions
 */

const projectionSchema = z.object({
  dealId: z.number(),
  scenarioType: z.enum(["conservative", "moderate", "aggressive"]),

  // Base financials
  currentRevenue: z.number().positive(),
  currentProfit: z.number(),
  currentCashFlow: z.number(),
  currentMargin: z.number().min(0).max(100),

  // Growth assumptions
  revenueGrowthRate: z.number().min(-50).max(200), // %
  marginImprovement: z.number().min(-50).max(50).default(0), // basis points per year

  // Operating assumptions
  fixedCosts: z.number().default(0),
  variableCostPercent: z.number().min(0).max(100).default(60),

  // AI optimization assumptions
  aiAutomationSavings: z.number().min(0).max(100).default(0), // % cost reduction
  aiRevenueUplift: z.number().min(0).max(100).default(0), // % revenue increase

  // Tax assumptions
  opportunityZone: z.boolean().default(false),
  effectiveTaxRate: z.number().min(0).max(50).default(25), // %
});

const simulateSchema = z.object({
  dealId: z.number(),
  currentRevenue: z.number().positive(),
  currentProfit: z.number(),
  currentCashFlow: z.number(),
  currentMargin: z.number().min(0).max(100),
  fixedCosts: z.number().default(0),
  variableCostPercent: z.number().min(0).max(100).default(60),
  aiAutomationSavings: z.number().min(0).max(100).default(0),
  aiRevenueUplift: z.number().min(0).max(100).default(0),
  opportunityZone: z.boolean().default(false),
  effectiveTaxRate: z.number().min(0).max(50).default(25),
});

/**
 * Generate 5-year projections based on scenario type
 */
function generateProjections(
  baseRevenue: number,
  baseProfit: number,
  baseCashFlow: number,
  baseMargin: number,
  growthRate: number,
  marginImprovement: number,
  fixedCosts: number,
  variableCostPercent: number,
  aiAutomationSavings: number,
  aiRevenueUplift: number,
  opportunityZone: boolean,
  effectiveTaxRate: number
): Array<{
  year: number;
  revenue: number;
  profit: number;
  cashFlow: number;
  margin: number;
  taxSavings: number;
}> {
  const projections = [];

  for (let year = 1; year <= 5; year++) {
    // Revenue projection with AI uplift
    const revenue = baseRevenue * Math.pow(1 + (growthRate + aiRevenueUplift) / 100, year);

    // Cost structure
    const variableCosts = revenue * (variableCostPercent / 100);
    const adjustedFixedCosts = fixedCosts * (1 - aiAutomationSavings / 100);
    const totalCosts = variableCosts + adjustedFixedCosts;

    // Margin improvement
    const margin = Math.min(baseMargin + (marginImprovement * year), 100);

    // Profit calculation
    const profit = revenue - totalCosts;

    // Cash flow (simplified - profit + depreciation - capex)
    const cashFlow = profit * 0.9; // Assume 90% conversion to cash

    // Tax savings from Opportunity Zone
    let taxSavings = 0;
    if (opportunityZone) {
      if (year === 5) {
        taxSavings = profit * (effectiveTaxRate / 100) * 0.10; // 10% basis step-up
      }
      if (year === 7) {
        taxSavings = profit * (effectiveTaxRate / 100) * 0.15; // 15% basis step-up
      }
    }

    projections.push({
      year,
      revenue: Math.round(revenue),
      profit: Math.round(profit),
      cashFlow: Math.round(cashFlow),
      margin: Math.round(margin * 100) / 100,
      taxSavings: Math.round(taxSavings),
    });
  }

  return projections;
}

export const projectionsRouter = router({
  /**
   * Generate projections for a specific scenario
   */
  generate: protectedProcedure
    .input(projectionSchema)
    .mutation(async ({ input, ctx }) => {
      // Adjust assumptions based on scenario type
      let growthRate = input.revenueGrowthRate;
      let marginImprovement = input.marginImprovement;
      let aiSavings = input.aiAutomationSavings;
      let aiUplift = input.aiRevenueUplift;

      switch (input.scenarioType) {
        case "conservative":
          growthRate *= 0.5; // 50% of base growth
          marginImprovement *= 0.5;
          aiSavings *= 0.5;
          aiUplift *= 0.5;
          break;
        case "moderate":
          // Use base assumptions
          break;
        case "aggressive":
          growthRate *= 1.5; // 150% of base growth
          marginImprovement *= 1.5;
          aiSavings *= 1.2;
          aiUplift *= 1.2;
          break;
      }

      const projections = generateProjections(
        input.currentRevenue,
        input.currentProfit,
        input.currentCashFlow,
        input.currentMargin,
        growthRate,
        marginImprovement,
        input.fixedCosts,
        input.variableCostPercent,
        aiSavings,
        aiUplift,
        input.opportunityZone,
        input.effectiveTaxRate
      );

      // Calculate summary metrics
      const totalRevenue = projections.reduce((sum, p) => sum + p.revenue, 0);
      const totalProfit = projections.reduce((sum, p) => sum + p.profit, 0);
      const totalCashFlow = projections.reduce((sum, p) => sum + p.cashFlow, 0);
      const totalTaxSavings = projections.reduce((sum, p) => sum + p.taxSavings, 0);

      const avgGrowthRate = projections.length > 1
        ? ((projections[projections.length - 1].revenue / projections[0].revenue) ** (1 / projections.length) - 1) * 100
        : 0;

      return {
        success: true,
        scenarioType: input.scenarioType,
        projections,
        summary: {
          totalRevenue: Math.round(totalRevenue),
          totalProfit: Math.round(totalProfit),
          totalCashFlow: Math.round(totalCashFlow),
          totalTaxSavings: Math.round(totalTaxSavings),
          avgGrowthRate: Math.round(avgGrowthRate * 100) / 100,
          finalYearRevenue: projections[projections.length - 1].revenue,
          finalYearMargin: projections[projections.length - 1].margin,
        },
      };
    }),

  /**
   * Run all three scenarios simultaneously
   */
  simulate: protectedProcedure
    .input(simulateSchema)
    .mutation(async ({ input, ctx }) => {
      const scenarios = ["conservative", "moderate", "aggressive"] as const;
      const results: Record<string, any> = {};

      // Base growth assumptions
      const baseGrowthRates = {
        conservative: 3,
        moderate: 8,
        aggressive: 15,
      };

      for (const scenario of scenarios) {
        const growthRate = baseGrowthRates[scenario];
        const marginImprovement = scenario === "conservative" ? 0.5 : scenario === "moderate" ? 1.0 : 2.0;

        const projections = generateProjections(
          input.currentRevenue,
          input.currentProfit,
          input.currentCashFlow,
          input.currentMargin,
          growthRate,
          marginImprovement,
          input.fixedCosts,
          input.variableCostPercent,
          input.aiAutomationSavings * (scenario === "conservative" ? 0.5 : scenario === "moderate" ? 1.0 : 1.2),
          input.aiRevenueUplift * (scenario === "conservative" ? 0.5 : scenario === "moderate" ? 1.0 : 1.2),
          input.opportunityZone,
          input.effectiveTaxRate
        );

        results[scenario] = {
          projections,
          summary: {
            totalRevenue: projections.reduce((sum, p) => sum + p.revenue, 0),
            totalProfit: projections.reduce((sum, p) => sum + p.profit, 0),
            totalCashFlow: projections.reduce((sum, p) => sum + p.cashFlow, 0),
            totalTaxSavings: projections.reduce((sum, p) => sum + p.taxSavings, 0),
            finalYearRevenue: projections[projections.length - 1].revenue,
          },
        };
      }

      return {
        success: true,
        scenarios: results,
      };
    }),

  /**
   * Save a projection scenario
   */
  save: protectedProcedure
    .input(z.object({
      dealId: z.number().optional(),
      name: z.string(),
      assumptions: projectionSchema, // Reuse the schema as the JSON shape
      results: z.array(z.object({
        year: z.number(),
        revenue: z.number(),
        profit: z.number(),
        cashFlow: z.number(),
        margin: z.number(),
        taxSavings: z.number(),
      })),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const result = await db.insert(projections).values({
        userId: ctx.user.id,
        dealId: input.dealId,
        name: input.name,
        assumptions: JSON.stringify(input.assumptions),
        results: JSON.stringify(input.results),
      });

      return { success: true, id: (result as any).insertId };
    }),

  /**
   * Get saved projections for a deal
   */
  listByDeal: protectedProcedure
    .input(z.object({ dealId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return [];

      const results = await db
        .select()
        .from(projections)
        .where(eq(projections.dealId, input.dealId))
        .orderBy(desc(projections.createdAt));

      // Parse JSON fields
      return results.map(p => ({
        ...p,
        assumptions: JSON.parse(p.assumptions),
        results: JSON.parse(p.results || "[]"),
      }));
    }),
});
