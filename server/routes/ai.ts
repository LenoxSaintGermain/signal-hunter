import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message, propertyContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    // Call Gemini 3 Pro API with HIGH thinking mode
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${apiKey}`,
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
            maxOutputTokens: 8192,
            thinkingConfig: {
              mode: "HIGH", // Use HIGH thinking mode for complex investment analysis
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return res.status(response.status).json({ 
        error: "Failed to get response from AI",
        details: errorText 
      });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      return res.status(500).json({ error: "No response from AI" });
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
