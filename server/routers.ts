import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { chatMessages, deals } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    chat: publicProcedure
      .input(
        z.object({
          message: z.string(),
          propertyContext: z
            .object({
              name: z.string(),
              price: z.number(),
              location: z.string().nullable(),
            })
            .nullable()
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { message, propertyContext } = input;

        console.log("[AI Chat] Received request:", { message, propertyContext });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.error("[AI Chat] GEMINI_API_KEY not found in environment");
          throw new Error("Gemini API key not configured");
        }

        // Call Gemini 3 Pro API (latest model)
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an expert real estate investment advisor specializing in commercial properties, stadium-adjacent developments, and Opportunity Zone investments. 

${propertyContext ? `Current Property Context:
- Name: ${propertyContext.name}
- Price: $${(propertyContext.price / 1000).toFixed(0)}K
- Location: ${propertyContext.location}
` : ""}

User Question: ${message}

Provide detailed, actionable advice. If asked to validate information, explain how to verify it. If asked about research, provide specific sources and methodologies. Be professional, concise, and focused on helping the investor make informed decisions.`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[AI Chat] Gemini API error:", response.status, errorText);
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[AI Chat] Gemini response:", JSON.stringify(data, null, 2));
        
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
          console.error("[AI Chat] No text in response:", data);
          throw new Error("No response from AI");
        }

        console.log("[AI Chat] Success, response length:", aiResponse.length);
        
        // Save both user message and AI response to database
        try {
          const db = await getDb();
          if (db) {
            // Save user message
            await db.insert(chatMessages).values({
              userId: null, // TODO: Add user ID when auth is implemented
              role: "user",
              content: message,
              propertyContext: propertyContext ? JSON.stringify(propertyContext) : null,
            });

            // Save AI response
            await db.insert(chatMessages).values({
              userId: null,
              role: "assistant",
              content: aiResponse,
              propertyContext: propertyContext ? JSON.stringify(propertyContext) : null,
            });

            console.log("[AI Chat] Conversation saved to database");
          }
        } catch (dbError) {
          console.error("[AI Chat] Failed to save to database:", dbError);
          // Don't throw - still return the response even if DB save fails
        }

        return { response: aiResponse };
      }),

    // Get conversation history
    getHistory: publicProcedure
      .input(
        z.object({
          limit: z.number().optional().default(50),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          return [];
        }

        const messages = await db
          .select()
          .from(chatMessages)
          .orderBy(desc(chatMessages.createdAt))
          .limit(input.limit);

        // Return in chronological order (oldest first)
        return messages.reverse();
      }),

    // Clear conversation history
    clearHistory: publicProcedure.mutation(async () => {
      const db = await getDb();
      if (db) {
        await db.delete(chatMessages);
      }
      return { success: true };
    }),
  }),

  deals: router({
    // Get all deals
    getAll: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) {
        return [];
      }
      return await db.select().from(deals).orderBy(desc(deals.score));
    }),

    // Get deal by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          return null;
        }
        const result = await db.select().from(deals).where(eq(deals.id, input.id)).limit(1);
        return result[0] || null;
      }),

    // Get deals by stage
    getByStage: publicProcedure
      .input(z.object({ stage: z.enum(["lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"]) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          return [];
        }
        return await db.select().from(deals).where(eq(deals.stage, input.stage)).orderBy(desc(deals.score));
      }),
  }),

  investors: router({
    submitIntake: publicProcedure
      .input(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          investorType: z.string(),
          capitalRange: z.string(),
          checkSize: z.string(),
          experienceLevel: z.string(),
          dealTypes: z.array(z.string()),
          timeHorizon: z.string(),
          riskAppetite: z.string(),
          geographyPreference: z.string(),
          liquidityPreference: z.string(),
          investmentGoals: z.string(),
          notesAdditional: z.string().optional(),
          opportunityId: z.string(),
          opportunityName: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        console.log("[Investor Intake] Received submission:", {
          email: input.email,
          opportunityId: input.opportunityId,
        });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("Gemini API key not configured");
        }

        // Generate AI Dossier using Gemini 3 Pro
        const dossierPrompt = `You are an AI analyst for a private real estate and alternative investments firm.

Analyze this investor profile and generate a structured investment dossier:

**Investor Profile:**
- Name: ${input.firstName} ${input.lastName}
- Email: ${input.email}
- Phone: ${input.phone || "Not provided"}
- Investor Type: ${input.investorType}
- Net Investable Capital: ${input.capitalRange}
- Check Size Preference: ${input.checkSize}
- Experience Level: ${input.experienceLevel}
- Deal Types Interested In: ${input.dealTypes.join(", ")}
- Time Horizon: ${input.timeHorizon}
- Risk Appetite: ${input.riskAppetite}
- Geography Preference: ${input.geographyPreference}
- Liquidity Preference: ${input.liquidityPreference}
- Investment Goals: ${input.investmentGoals}
- Additional Notes: ${input.notesAdditional || "None"}
- Current Opportunity: ${input.opportunityName} (${input.opportunityId})

Generate a JSON dossier with:
1. **persona**: Classify investor into one of: "Wealth Builder", "Cash Flow Hunter", "Tax Optimizer", "Passive LP", "Active Operator", "Institutional"
2. **deal_fit_score**: 0-100 score for fit with current opportunity
3. **capital_deployment_strategy**: AI-inferred strategy
4. **recommended_deal_types**: Top 2 alternative deal types
5. **risk_profile_summary**: 2-3 sentence summary
6. **leverage_profile**: Suggested debt-to-equity ratio
7. **red_flags**: Array of concerns or "None"
8. **next_steps**: Array of 2-3 recommended actions
9. **human_summary**: 3-4 sentence executive summary for founder

Respond ONLY with valid JSON, no markdown formatting.`;

        try {
          const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" +
              apiKey,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: dossierPrompt }] }],
                generationConfig: {
                  temperature: 0.3,
                  maxOutputTokens: 2048,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
          }

          const data = await response.json();
          const dossierText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

          // Parse AI-generated dossier
          let dossier;
          try {
            // Remove markdown code blocks if present
            const cleanText = dossierText
              .replace(/```json\n?/g, "")
              .replace(/```\n?/g, "")
              .trim();
            dossier = JSON.parse(cleanText);
          } catch (e) {
            console.error("[Investor Intake] Failed to parse dossier:", dossierText);
            dossier = {
              persona: "Unclassified",
              deal_fit_score: 50,
              human_summary: "Profile received but AI analysis failed. Manual review required.",
            };
          }

          console.log("[Investor Intake] Generated dossier:", dossier);

          // TODO: Save to database (investors table)
          // TODO: Send email notification to founder
          // TODO: Send personalized email to investor

          return {
            success: true,
            dossier,
            message: "Your investor profile has been submitted successfully.",
          };
        } catch (error) {
          console.error("[Investor Intake] Error:", error);
          throw new Error("Failed to process investor intake");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
