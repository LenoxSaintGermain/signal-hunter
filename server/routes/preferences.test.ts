import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "../db";
import { userPreferences } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Preferences Database Schema", () => {
  const testUserId = 999999; // Test user ID

  beforeAll(async () => {
    // Clean up any existing test data
    const db = await getDb();
    if (db) {
      await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));
    }
  });

  afterAll(async () => {
    // Clean up test data
    const db = await getDb();
    if (db) {
      await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));
    }
  });

  it("should create user preferences", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();
    if (!db) return;

    await db.insert(userPreferences).values({
      userId: testUserId,
      geminiApiMode: "beta",
      customPromptTemplate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const prefs = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, testUserId))
      .limit(1);

    expect(prefs).toHaveLength(1);
    expect(prefs[0].geminiApiMode).toBe("beta");
  });

  it("should update preferences to GA mode", async () => {
    const db = await getDb();
    if (!db) return;

    await db
      .update(userPreferences)
      .set({
        geminiApiMode: "ga",
        customPromptTemplate: "Test prompt",
        updatedAt: new Date(),
      })
      .where(eq(userPreferences.userId, testUserId));

    const updated = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, testUserId))
      .limit(1);

    expect(updated[0].geminiApiMode).toBe("ga");
    expect(updated[0].customPromptTemplate).toBe("Test prompt");
  });
});
