import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { deals } from "../drizzle/schema";

describe("Deals Integration", () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
  });

  it("should fetch all deals from database", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    
    expect(allDeals).toBeDefined();
    expect(Array.isArray(allDeals)).toBe(true);
    expect(allDeals.length).toBeGreaterThan(0);
  });

  it("should have deals with required fields", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const firstDeal = allDeals[0];
    
    expect(firstDeal).toHaveProperty("id");
    expect(firstDeal).toHaveProperty("name");
    expect(firstDeal).toHaveProperty("price");
    expect(firstDeal).toHaveProperty("stage");
    expect(firstDeal).toHaveProperty("score");
  });

  it("should have Stadium Plaza Mixed-Use deal", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const stadiumDeal = allDeals.find(d => d.name === "Stadium Plaza Mixed-Use");
    
    expect(stadiumDeal).toBeDefined();
    expect(stadiumDeal?.price).toBe(12500000);
    expect(stadiumDeal?.location).toBe("Downtown Sports District");
    expect(stadiumDeal?.opportunityZone).toBe(true);
  });

  it("should have deals with financial metrics", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const dealsWithMetrics = allDeals.filter(d => d.revenue && d.cashFlow && d.sdeMargin);
    
    expect(dealsWithMetrics.length).toBeGreaterThan(0);
    
    // Verify Stadium Plaza has correct metrics
    const stadiumDeal = allDeals.find(d => d.name === "Stadium Plaza Mixed-Use");
    expect(stadiumDeal?.revenue).toBe(3200000);
    expect(stadiumDeal?.cashFlow).toBe(950000);
    expect(stadiumDeal?.sdeMargin).toBeCloseTo(29.7, 1);
  });

  it("should have deals with AI and certification scores", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const dealsWithScores = allDeals.filter(d => d.aiPotential && d.certAdvantage);
    
    expect(dealsWithScores.length).toBeGreaterThan(0);
    
    // Verify Government Contractor has highest cert advantage
    const govContractor = allDeals.find(d => d.name === "Government Contractor - IT Services");
    expect(govContractor?.aiPotential).toBe(45);
    expect(govContractor?.certAdvantage).toBe(30);
  });

  it("should have deals in different stages", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const stages = new Set(allDeals.map(d => d.stage));
    
    expect(stages.size).toBeGreaterThan(1);
    expect(stages.has("initial_review")).toBe(true);
    expect(stages.has("due_diligence")).toBe(true);
    expect(stages.has("negotiation")).toBe(true);
  });

  it("should have Opportunity Zone deals", async () => {
    if (!db) {
      throw new Error("Database connection failed");
    }

    const allDeals = await db.select().from(deals);
    const ozDeals = allDeals.filter(d => d.opportunityZone === true);
    
    expect(ozDeals.length).toBeGreaterThan(0);
    
    // Verify specific OZ deals
    const ozNames = ozDeals.map(d => d.name);
    expect(ozNames).toContain("Stadium Plaza Mixed-Use");
    expect(ozNames).toContain("Multifamily - Opportunity Zone");
  });
});
