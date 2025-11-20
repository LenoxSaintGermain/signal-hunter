import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

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
              location: z.string(),
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
        return { response: aiResponse };
      }),
  }),
});

export type AppRouter = typeof appRouter;
