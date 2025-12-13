import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { deals } from "../../drizzle/schema";
import { OpenAI } from "openai";

// Tool for extracting content from a URL (Mock for now, would use Puppeteer/Cheerio in prod)
async function fetchUrlContent(url: string): Promise<string> {
    // In a real app, use a headless browser or fetch + cheerio here.
    // For this MVP, we assumes the user might paste text, or we just return the URL for the LLM to "hallucinate" or use its browsing tool if enabled.
    // Since we don't have a live browsing tool in this backend context yet, we'll ask the user to paste text OR we simulate a basic fetch.
    return `Content from ${url}`;
}

export const ingestRouter = router({
    parse: publicProcedure
        .input(z.object({
            content: z.string(), // URL or Text
            type: z.enum(["url", "text"])
        }))
        .mutation(async ({ input }) => {
            console.log("🔮 Magic Paste Ingestion Started...");

            // 1. Get Context
            let rawText = input.content;
            if (input.type === "url") {
                // Determine if it's a known site for special handling, else just pass URL to GPT-4o which can sometimes browse or infer
                // For this strict environment, we'll treat it as text if we can't fetch.
                // Let's rely on the LLM to extract from the string itself if it's a rich description, 
                // or user pastes the body.
            }

            // 2. AI Extraction (The "Ingestion Agent")
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

            const prompt = `
            You are a Deal Ingestion Agent. Parse the following unstructured input into a structured deal record.
            
            INPUT:
            ${rawText}
            
            TASKS:
            1. Extract Name, Price, Revenue, Cash Flow, Industry, Location.
            2. Classify the "Visual Narrative Template":
               - "property_value_add": Real estate with renovation potential.
               - "business_cash_flow": Operating business (SaaS, Service, Retail).
               - "development_play": Land or heavy construction.
               - "default": If unclear.
            3. Draft a short 1-sentence description.
            4. Estimate an AI Potential Score (0-100) based on text.
            
            Return JSON only:
            {
                "name": "Deal Name",
                "price": 0,
                "revenue": 0,
                "cashFlow": 0,
                "industry": "Industry",
                "location": "City, State",
                "narrativeTemplate": "enum_value",
                "description": "Short summary",
                "aiPotential": 50
            }
            `;

            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "system", content: "You are a JSON extraction engine." }, { role: "user", content: prompt }],
                response_format: { type: "json_object" }
            });

            const result = JSON.parse(completion.choices[0].message.content || "{}");

            // 3. Create Draft Deal in DB
            const db = await getDb();
            if (!db) throw new Error("Database unavailable");

            const inserted = await db.insert(deals).values({
                name: result.name || "Untitled Deal",
                price: result.price || 0,
                revenue: result.revenue || 0,
                cashFlow: result.cashFlow || 0,
                industry: result.industry || "Unknown",
                location: result.location || "Unknown",
                narrativeTemplate: result.narrativeTemplate,
                description: result.description,
                aiPotential: result.aiPotential || 50,
                stage: "draft",
                // Defaults
                score: 50,
                stage: "draft",
                createdAt: new Date(),
                updatedAt: new Date(),
                opportunityZone: false,
                visualsContext: JSON.stringify({ source: "magic_paste" }),
                originalSourceUrl: input.type === "url" ? input.content : null
            } as any); // Type cast for new columns if TS hasn't caught up, but schema is updated.

            return {
                message: "Deal Drafted Successfully",
                dealId: inserted[0].insertId,
                metrics: result
            };
        })
});
