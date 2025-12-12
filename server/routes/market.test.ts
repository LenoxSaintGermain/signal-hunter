import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "../db";
import { marketScans } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Market Scans Database Schema", () => {
  const testUserId = 999999; // Test user ID
  const testJobId = "test-job-" + Date.now();

  beforeAll(async () => {
    // Clean up any existing test data
    const db = await getDb();
    if (db) {
      await db.delete(marketScans).where(eq(marketScans.userId, testUserId));
    }
  });

  afterAll(async () => {
    // Clean up test data
    const db = await getDb();
    if (db) {
      await db.delete(marketScans).where(eq(marketScans.userId, testUserId));
    }
  });

  it("should create market scan record", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();
    if (!db) return;

    await db.insert(marketScans).values({
      userId: testUserId,
      jobId: testJobId,
      filters: JSON.stringify({ sectors: ["Technology"], states: ["GA"] }),
      status: "running",
      apiMode: "beta",
      createdAt: new Date(),
    });

    const scans = await db
      .select()
      .from(marketScans)
      .where(eq(marketScans.jobId, testJobId))
      .limit(1);

    expect(scans).toHaveLength(1);
    expect(scans[0].status).toBe("running");
    expect(scans[0].apiMode).toBe("beta");
  });

  it("should update scan status to completed", async () => {
    const db = await getDb();
    if (!db) return;

    await db
      .update(marketScans)
      .set({
        status: "completed",
        result: JSON.stringify({ listings: [] }),
        listingsCount: 5,
        completedAt: new Date(),
      })
      .where(eq(marketScans.jobId, testJobId));

    const updated = await db
      .select()
      .from(marketScans)
      .where(eq(marketScans.jobId, testJobId))
      .limit(1);

    expect(updated[0].status).toBe("completed");
    expect(updated[0].listingsCount).toBe(5);
  });
});
