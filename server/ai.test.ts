import { describe, expect, it } from "vitest";

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
