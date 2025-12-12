import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { userPreferences } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const updatePreferencesSchema = z.object({
  aiProvider: z.enum(["manus", "personal"]).optional(),
  geminiApiMode: z.enum(["beta", "ga"]).optional(),
  customPromptTemplate: z.string().optional(),
});

export const preferencesRouter = router({
  /**
   * Get user preferences (creates default if not exists)
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

    // Try to get existing preferences
    const existing = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, ctx.user.id))
      .limit(1);

    if (existing && existing.length > 0) {
      return existing[0];
    }

    // Create default preferences
    await db.insert(userPreferences).values({
      userId: ctx.user.id,
      aiProvider: "manus", // Default to Manus free tokens
      geminiApiMode: "beta",
      customPromptTemplate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return the newly created preferences
    const newPrefs = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, ctx.user.id))
      .limit(1);

    return newPrefs[0];
  }),

  /**
   * Update user preferences
   */
  update: protectedProcedure
    .input(updatePreferencesSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // Check if preferences exist
      const existing = await db
        .select()
        .from(userPreferences)
        .where(eq(userPreferences.userId, ctx.user.id))
        .limit(1);

      if (existing && existing.length > 0) {
        // Update existing
        await db
          .update(userPreferences)
          .set({
            ...input,
            updatedAt: new Date(),
          })
          .where(eq(userPreferences.userId, ctx.user.id));
      } else {
        // Create new
        await db.insert(userPreferences).values({
          userId: ctx.user.id,
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      return { success: true };
    }),
});
