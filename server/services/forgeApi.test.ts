import { describe, it, expect, beforeAll } from "vitest";
import * as ForgeAPI from "./forgeApi";

describe("Forge API Integration", () => {
  it("should check if Forge API is available", () => {
    const isAvailable = ForgeAPI.isForgeAPIAvailable();
    expect(typeof isAvailable).toBe("boolean");
  });

  it("should get Forge API status", async () => {
    const status = await ForgeAPI.getForgeAPIStatus();
    expect(status).toHaveProperty("available");
    expect(status).toHaveProperty("endpoint");
    expect(status).toHaveProperty("configured");
    expect(typeof status.available).toBe("boolean");
    expect(typeof status.configured).toBe("boolean");
  });

  // Skip actual API calls in tests to avoid consuming tokens
  it.skip("should analyze with GPT-4 via Forge API", async () => {
    const mockDeal = {
      name: "Test Business",
      industry: "Technology",
      location: "San Francisco, CA",
      price: 1500000,
      revenue: 2000000,
      cashFlow: 500000,
      description: "Test description",
    };

    const analysis = await ForgeAPI.analyzeWithGPT4Forge(mockDeal);
    expect(typeof analysis).toBe("string");
    expect(analysis.length).toBeGreaterThan(0);
  });

  it.skip("should analyze with Claude via Forge API", async () => {
    const mockDeal = {
      name: "Test Business",
      industry: "Technology",
      location: "San Francisco, CA",
      price: 1500000,
      revenue: 2000000,
      cashFlow: 500000,
      description: "Test description",
      stage: "due_diligence",
      notes: "Test notes",
    };

    const analysis = await ForgeAPI.analyzeWithClaudeForge(mockDeal);
    expect(typeof analysis).toBe("string");
    expect(analysis.length).toBeGreaterThan(0);
  });

  it.skip("should analyze with Gemini via Forge API", async () => {
    const mockDeal = {
      name: "Test Business",
      price: 1500000,
      revenue: 2000000,
      cashFlow: 500000,
      sdeMargin: 0.25,
    };

    const analysis = await ForgeAPI.analyzeWithGeminiForge(mockDeal);
    expect(typeof analysis).toBe("string");
    expect(analysis.length).toBeGreaterThan(0);
  });

  it.skip("should analyze with Perplexity via Forge API", async () => {
    const mockDeal = {
      name: "Test Business",
      industry: "Technology",
      location: "San Francisco, CA",
      price: 1500000,
      revenue: 2000000,
      cashFlow: 500000,
    };

    const analysis = await ForgeAPI.analyzeWithPerplexityForge(mockDeal);
    expect(typeof analysis).toBe("string");
    expect(analysis.length).toBeGreaterThan(0);
  });

  it.skip("should analyze with Grok via Forge API", async () => {
    const mockDeal = {
      name: "Test Business",
      industry: "Technology",
      location: "San Francisco, CA",
      price: 1500000,
      aiPotential: 85,
      certAdvantage: 70,
      opportunityZone: true,
    };

    const analysis = await ForgeAPI.analyzeWithGrokForge(mockDeal);
    expect(typeof analysis).toBe("string");
    expect(analysis.length).toBeGreaterThan(0);
  });
});
