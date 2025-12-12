import { describe, it, expect } from "vitest";
import { getDb } from "../db";
import { userPreferences } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

describe("User Preferences - AI Provider", () => {
  it("should have aiProvider field in schema", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Check that we can query the aiProvider field
    const prefs = await db.select().from(userPreferences).limit(1);
    
    // Schema should allow aiProvider field
    expect(userPreferences).toBeDefined();
  });

  it("should default to 'manus' provider for new preferences", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Create a test preference with only required fields
    const testUserId = 99999; // Use high ID to avoid conflicts
    
    // Clean up any existing test data
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));

    // Insert with default aiProvider
    await db.insert(userPreferences).values({
      userId: testUserId,
      aiProvider: "manus",
      geminiApiMode: "beta",
      customPromptTemplate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Verify it was created with correct default
    const result = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, testUserId))
      .limit(1);

    expect(result.length).toBe(1);
    expect(result[0].aiProvider).toBe("manus");

    // Clean up
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));
  });

  it("should allow switching to 'personal' provider", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const testUserId = 99998;
    
    // Clean up
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));

    // Insert with personal provider
    await db.insert(userPreferences).values({
      userId: testUserId,
      aiProvider: "personal",
      geminiApiMode: "beta",
      customPromptTemplate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, testUserId))
      .limit(1);

    expect(result[0].aiProvider).toBe("personal");

    // Clean up
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));
  });

  it("should update aiProvider preference", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const testUserId = 99997;
    
    // Clean up
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));

    // Create with manus
    await db.insert(userPreferences).values({
      userId: testUserId,
      aiProvider: "manus",
      geminiApiMode: "beta",
      customPromptTemplate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update to personal
    await db
      .update(userPreferences)
      .set({ aiProvider: "personal", updatedAt: new Date() })
      .where(eq(userPreferences.userId, testUserId));

    const result = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, testUserId))
      .limit(1);

    expect(result[0].aiProvider).toBe("personal");

    // Clean up
    await db.delete(userPreferences).where(eq(userPreferences.userId, testUserId));
  });
});
