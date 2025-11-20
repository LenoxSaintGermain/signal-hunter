import { describe, expect, it, afterAll } from "vitest";
import { getDb } from "./db";
import { chatMessages } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

describe("AI Chat API", () => {
  it("should have GEMINI_API_KEY configured", () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
    expect(process.env.GEMINI_API_KEY).toMatch(/^AIzaSy/);
  });

  it("should successfully call Gemini API", async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    
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
              parts: [{ text: "Say 'test successful' in exactly 2 words" }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100,
          },
        }),
      }
    );

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.candidates).toBeDefined();
    expect(data.candidates.length).toBeGreaterThan(0);
  }, 30000); // 30 second timeout for API call
});

describe("AI Chat - Conversation History", () => {
  let testMessageIds: number[] = [];

  afterAll(async () => {
    // Clean up test messages
    const db = await getDb();
    if (db && testMessageIds.length > 0) {
      for (const id of testMessageIds) {
        await db.delete(chatMessages).where(eq(chatMessages.id, id));
      }
    }
  });

  it("should save user and assistant messages to database", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    if (!db) return;

    // Insert test user message
    const [userResult] = await db.insert(chatMessages).values({
      userId: null,
      role: "user",
      content: "Test user message for history",
      propertyContext: null,
    });

    // Insert test assistant message
    const [assistantResult] = await db.insert(chatMessages).values({
      userId: null,
      role: "assistant",
      content: "Test assistant response",
      propertyContext: null,
    });

    // Verify messages were inserted
    const messages = await db
      .select()
      .from(chatMessages)
      .orderBy(desc(chatMessages.createdAt))
      .limit(2);

    expect(messages.length).toBeGreaterThanOrEqual(2);
    expect(messages.some(m => m.role === "user")).toBe(true);
    expect(messages.some(m => m.role === "assistant")).toBe(true);

    // Store IDs for cleanup
    testMessageIds = messages.map(m => m.id);
  });

  it("should retrieve conversation history in chronological order", async () => {
    const db = await getDb();
    if (!db) return;

    const messages = await db
      .select()
      .from(chatMessages)
      .orderBy(desc(chatMessages.createdAt))
      .limit(50);

    // Reverse to get chronological order (oldest first)
    const chronological = messages.reverse();

    expect(chronological.length).toBeGreaterThan(0);

    // Verify timestamps are in order
    for (let i = 1; i < chronological.length; i++) {
      const prev = new Date(chronological[i - 1].createdAt).getTime();
      const curr = new Date(chronological[i].createdAt).getTime();
      expect(curr).toBeGreaterThanOrEqual(prev);
    }
  });

  it("should handle property context in messages", async () => {
    const db = await getDb();
    if (!db) return;

    const propertyContext = {
      name: "Test Property",
      price: 1000000,
      location: "Test Location",
    };

    const uniqueContent = `Question about property at ${Date.now()}`;

    await db.insert(chatMessages).values({
      userId: null,
      role: "user",
      content: uniqueContent,
      propertyContext: JSON.stringify(propertyContext),
    });

    // Find the message we just inserted
    const allMessages = await db
      .select()
      .from(chatMessages)
      .orderBy(desc(chatMessages.createdAt))
      .limit(10);

    const message = allMessages.find(m => m.content === uniqueContent);

    expect(message).toBeTruthy();
    expect(message!.propertyContext).toBeTruthy();
    const parsed = JSON.parse(message!.propertyContext!);
    expect(parsed.name).toBe("Test Property");
    expect(parsed.price).toBe(1000000);

    // Add to cleanup
    testMessageIds.push(message!.id);
  });
});
