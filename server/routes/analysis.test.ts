import { describe, it, expect } from "vitest";
import { getDb } from "../db";
import { deals } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

describe("AI Analysis Integration", () => {
  it("should have required environment variables", () => {
    // Check which AI services are configured
    const configured = {
      gemini: !!process.env.GEMINI_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      xai: !!process.env.XAI_API_KEY,
      perplexity: !!process.env.SONAR_API_KEY,
    };

    console.log("AI Services Configuration:", configured);

    // At least Gemini should be configured
    expect(configured.gemini).toBe(true);
  });

  it("should fetch a test deal from database", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();
    if (!db) return;

    const testDeals = await db.select().from(deals).limit(1);
    expect(testDeals.length).toBeGreaterThan(0);

    const deal = testDeals[0];
    console.log(`Test deal: ${deal.name} (ID: ${deal.id})`);
    expect(deal.id).toBeDefined();
    expect(deal.name).toBeDefined();
  });

  // Note: Actual AI analysis test would require calling the tRPC endpoint
  // which needs proper context setup. For now, we validate prerequisites.
});
