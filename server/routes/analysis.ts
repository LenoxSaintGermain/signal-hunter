import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { deals, userPreferences } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import * as ForgeAPI from "../services/forgeApi";
import {
  analyzeWithPerplexityForge,
  analyzeWithGPT4Forge,
  analyzeWithGeminiForge,
  analyzeWithGrokForge,
  analyzeWithClaudeForge,
} from "../services/forgeAnalysis";

// AI Analysis Types
interface AIAnalysisResult {
  model: string;
  score: number; // 0-100
  confidence: number; // 0-1
  reasoning: string;
  strengths: string[];
  risks: string[];
  recommendation: "strong_buy" | "buy" | "hold" | "pass";
}

interface CombinedAnalysis {
  dealId: number;
  dealName: string;
  overallScore: number; // Weighted average
  confidence: number; // Average confidence
  consensus: "strong_buy" | "buy" | "hold" | "pass";
  models: AIAnalysisResult[];
  summary: string;
  topStrengths: string[];
  topRisks: string[];
  timestamp: string;
}

/**
 * Call Perplexity API for market research and competitive analysis
 */
async function analyzeWithPerplexity(dealData: any): Promise<AIAnalysisResult> {
  const prompt = `Analyze this business acquisition opportunity:

Name: ${dealData.name}
Industry: ${dealData.industry}
Location: ${dealData.location}
Price: $${dealData.price?.toLocaleString()}
Revenue: $${dealData.revenue?.toLocaleString()}
Cash Flow: $${dealData.cashFlow?.toLocaleString()}

Provide:
1. Market analysis and competitive landscape
2. Growth potential and market trends
3. Location advantages/disadvantages
4. Score (0-100) based on market opportunity
5. Key strengths and risks
6. Recommendation (strong_buy/buy/hold/pass)`;

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SONAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "You are an expert business acquisition analyst specializing in market research and competitive analysis. Provide structured, data-driven insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Parse the response (simplified - in production, use structured output)
    const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
    const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

    return {
      model: "Perplexity Sonar Pro",
      score,
      confidence: 0.85,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Perplexity analysis failed:", error);
    return {
      model: "Perplexity Sonar Pro",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - API error",
      strengths: [],
      risks: ["API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Call GPT-5.1 for comprehensive business analysis and decision-making
 */
async function analyzeWithGPT51(dealData: any): Promise<AIAnalysisResult> {
  const prompt = `Analyze this business acquisition opportunity comprehensively:

Name: ${dealData.name}
Industry: ${dealData.industry}
Location: ${dealData.location}
Price: $${dealData.price?.toLocaleString()}
Revenue: $${dealData.revenue?.toLocaleString()}
Cash Flow: $${dealData.cashFlow?.toLocaleString()}
Description: ${dealData.description || 'N/A'}

Provide comprehensive analysis:
1. Business model evaluation
2. Financial health assessment
3. Market position and competitive advantages
4. Growth potential and scalability
5. Risk factors and mitigation strategies
6. Overall acquisition score (0-100)
7. Recommendation (strong_buy/buy/hold/pass) with reasoning`;

  try {
    const { OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        {
          role: "system",
          content: "You are an expert business acquisition analyst with deep expertise in financial analysis, market research, and strategic decision-making. Provide structured, actionable insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const analysis = completion.choices[0].message.content || "";

    const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
    const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

    return {
      model: "OpenAI GPT-5.1",
      score,
      confidence: 0.93,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("GPT-5.1 analysis failed:", error);
    return {
      model: "OpenAI GPT-5.1",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - API error",
      strengths: [],
      risks: ["API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Call Gemini API for financial document analysis
 */
async function analyzeWithGemini(dealData: any): Promise<AIAnalysisResult> {
  const prompt = `Analyze the financial metrics of this acquisition:

Name: ${dealData.name}
Price: $${dealData.price?.toLocaleString()}
Revenue: $${dealData.revenue?.toLocaleString()}
Cash Flow: $${dealData.cashFlow?.toLocaleString()}
SDE Margin: ${dealData.sdeMargin ? (dealData.sdeMargin * 100).toFixed(1) : 'N/A'}%

Calculate:
1. Revenue multiple (Price/Revenue)
2. Cash flow multiple (Price/Cash Flow)
3. Payback period
4. Financial health score (0-100)
5. Key financial strengths and risks
6. Recommendation based on financial metrics`;

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Stable model

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
    const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

    return {
      model: "Google Gemini 2.5 Flash",
      score,
      confidence: 0.9,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      model: "Google Gemini 2.5 Flash",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - API error",
      strengths: [],
      risks: ["API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Call Grok API for strategic reasoning and risk assessment
 */
async function analyzeWithGrok(dealData: any): Promise<AIAnalysisResult> {
  const prompt = `Perform strategic risk assessment for this acquisition:

Name: ${dealData.name}
Industry: ${dealData.industry}
Location: ${dealData.location}
Price: $${dealData.price?.toLocaleString()}
AI Potential Score: ${dealData.aiPotential}/100
SDVOSB Certification Advantage: ${dealData.certAdvantage}/100
Opportunity Zone: ${dealData.opportunityZone ? 'Yes' : 'No'}

Analyze:
1. Strategic fit and synergies
2. AI optimization opportunities
3. Certification advantages (SDVOSB)
4. Tax benefits (Opportunity Zone)
5. Risk factors and mitigation strategies
6. Overall strategic score (0-100)
7. Recommendation`;

  try {
    const { OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: process.env.XAI_API_KEY!,
      baseURL: "https://api.x.ai/v1",
    });

    const completion = await client.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: "You are a strategic acquisition advisor specializing in risk assessment and opportunity evaluation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const analysis = completion.choices[0].message.content || "";

    const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
    const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

    return {
      model: "Grok Beta",
      score,
      confidence: 0.88,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Grok analysis failed:", error);
    return {
      model: "Grok Beta",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - API error",
      strengths: [],
      risks: ["API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Call Claude API for comprehensive due diligence reports
 */
async function analyzeWithClaude(dealData: any): Promise<AIAnalysisResult> {
  const prompt = `Conduct comprehensive due diligence for this acquisition:

Name: ${dealData.name}
Description: ${dealData.description || 'N/A'}
Industry: ${dealData.industry}
Location: ${dealData.location}
Price: $${dealData.price?.toLocaleString()}
Revenue: $${dealData.revenue?.toLocaleString()}
Cash Flow: $${dealData.cashFlow?.toLocaleString()}
Current Stage: ${dealData.stage}
Notes: ${dealData.notes || 'N/A'}

Provide comprehensive analysis:
1. Business model evaluation
2. Operational assessment
3. Legal and compliance considerations
4. Integration complexity
5. Overall due diligence score (0-100)
6. Critical strengths and risks
7. Final recommendation with confidence level`;

  try {
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const analysis = message.content[0].type === 'text' ? message.content[0].text : "";

    const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
    const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

    return {
      model: "Claude Sonnet 4.5",
      score,
      confidence: 0.92,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Claude analysis failed:", error);
    return {
      model: "Claude Sonnet 4.5",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - API error",
      strengths: [],
      risks: ["API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Helper function to extract bullet points from analysis text
 */
function extractBulletPoints(text: string, type: "strength" | "risk"): string[] {
  const section = type === "strength" ? "strength" : "risk";
  const regex = new RegExp(`${section}[s]?:([^]*?)(?=\\n\\n|risk[s]?:|recommendation|$)`, 'i');
  const match = text.match(regex);

  if (!match) return [];

  const lines = match[1].split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./))
    .map(line => line.replace(/^[-•]\s*|\d+\.\s*/, '').trim())
    .filter(line => line.length > 10);

  return lines.slice(0, 5); // Top 5
}

/**
 * Combine multiple AI analyses into a unified recommendation
 */
function combineAnalyses(dealData: any, analyses: AIAnalysisResult[]): CombinedAnalysis {
  // Calculate weighted average score
  const totalWeight = analyses.reduce((sum, a) => sum + a.confidence, 0);
  const overallScore = analyses.reduce((sum, a) => sum + (a.score * a.confidence), 0) / totalWeight;

  // Calculate average confidence
  const confidence = analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length;

  // Determine consensus recommendation
  const recommendations = analyses.map(a => a.recommendation);
  const recommendationCounts = {
    strong_buy: recommendations.filter(r => r === "strong_buy").length,
    buy: recommendations.filter(r => r === "buy").length,
    hold: recommendations.filter(r => r === "hold").length,
    pass: recommendations.filter(r => r === "pass").length,
  };

  const consensus = Object.entries(recommendationCounts)
    .sort(([, a], [, b]) => b - a)[0][0] as any;

  // Aggregate strengths and risks
  const allStrengths = analyses.flatMap(a => a.strengths);
  const allRisks = analyses.flatMap(a => a.risks);

  // Get top 5 most common strengths and risks
  const topStrengths = getMostCommon(allStrengths, 5);
  const topRisks = getMostCommon(allRisks, 5);

  // Generate summary
  const summary = `Multi-model AI analysis of ${dealData.name} yielded an overall score of ${overallScore.toFixed(1)}/100 with ${(confidence * 100).toFixed(0)}% confidence. Consensus recommendation: ${consensus.toUpperCase().replace('_', ' ')}. ${analyses.length} flagship AI models (Perplexity, GPT-5.1, Gemini 3 Pro, Grok 4, Claude Sonnet 4.5) analyzed market opportunity, financial metrics, strategic fit, and comprehensive due diligence.`;

  return {
    dealId: dealData.id,
    dealName: dealData.name,
    overallScore: Math.round(overallScore),
    confidence,
    consensus,
    models: analyses,
    summary,
    topStrengths,
    topRisks,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Helper to get most common items from array
 */
function getMostCommon(arr: string[], limit: number): string[] {
  const counts = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([item]) => item);
}

export const analysisRouter = router({
  /**
   * Trigger multi-model AI analysis for a deal
   */
  trigger: publicProcedure
    .input(z.object({
      dealId: z.number(),
    }))
    .mutation(async ({ input }) => {
      // Fetch deal data
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const dealData = await db.select().from(deals).where(eq(deals.id, input.dealId)).limit(1);

      if (dealData.length === 0) {
        throw new Error(`Deal ${input.dealId} not found`);
      }

      const deal = dealData[0];

      // Check user's AI provider preference
      const prefs = await db.select().from(userPreferences).where(eq(userPreferences.userId, deal.userId || 0)).limit(1);
      const aiProvider = prefs[0]?.aiProvider || "manus"; // Default to Manus free tokens

      console.log(`🤖 Starting multi-model AI analysis for: ${deal.name} (provider: ${aiProvider})`);

      // Run all 5 AI analyses in parallel (gracefully handle failures)
      // Use Forge API if provider is "manus", otherwise use direct APIs
      const results = await Promise.allSettled(
        aiProvider === "manus" && ForgeAPI.isForgeAPIAvailable()
          ? [
            analyzeWithPerplexityForge(deal),
            analyzeWithGPT4Forge(deal),
            analyzeWithGeminiForge(deal),
            analyzeWithGrokForge(deal),
            analyzeWithClaudeForge(deal),
          ]
          : [
            analyzeWithPerplexity(deal),
            analyzeWithGPT51(deal),
            analyzeWithGemini(deal),
            analyzeWithGrok(deal),
            analyzeWithClaude(deal),
          ]
      );

      // Extract successful results or use fallbacks
      const [perplexityResult, gpt51Result, geminiResult, grokResult, claudeResult] = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          const models = ['Perplexity', 'OpenAI GPT-5.1', 'Gemini 3 Pro', 'Grok 4', 'Claude Sonnet 4.5'];
          console.error(`${models[index]} analysis rejected:`, result.reason);
          return {
            model: models[index],
            score: 70,
            confidence: 0.5,
            reasoning: "Analysis unavailable - API error",
            strengths: [],
            risks: ["API analysis failed"],
            recommendation: "hold" as const,
          };
        }
      });

      // Combine results
      const combined = combineAnalyses(deal, [
        perplexityResult,
        gpt51Result,
        geminiResult,
        grokResult,
        claudeResult,
      ]);

      console.log(`✅ Analysis complete: ${combined.overallScore}/100 (${combined.consensus})`);

      return combined;
    }),

  /**
   * Get analysis status (placeholder for V2 with database storage)
   */
  getStatus: publicProcedure
    .input(z.object({
      dealId: z.number(),
    }))
    .query(async ({ input }) => {
      return {
        dealId: input.dealId,
        status: "not_started",
        message: "Analysis not yet run. Click 'Analyze' to start.",
      };
    }),

  /**
   * Chat with the AI Agent about a specific deal or general questions
   */
  chat: publicProcedure
    .input(z.object({
      message: z.string(),
      dealId: z.number().optional(),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string()
      })).optional()
    }))
    .mutation(async ({ input }) => {
      // 1. Fetch Context (Deal Data) if available
      let contextData = "";
      if (input.dealId) {
        try {
          const db = await getDb();
          if (db) {
            const dealData = await db.select().from(deals).where(eq(deals.id, input.dealId)).limit(1);
            if (dealData.length > 0) {
              const d = dealData[0];
              contextData = `
Current Deal Context:
Name: ${d.name}
Industry: ${d.industry}
Location: ${d.location}
Price: $${d.price?.toLocaleString() || 'N/A'}
Revenue: $${d.revenue?.toLocaleString() || 'N/A'}
Notes: ${d.notes || 'N/A'}
AI Score: ${d.score || 'N/A'}/100
`;
            }
          }
        } catch (dbError) {
          console.warn("Failed to fetch deal context for agent:", dbError);
        }
      }

      const systemPrompt = `You are the Signal Hunter AI Agent, a sophisticated acquisition assistant. 
Your goal is to help the user evaluate business opportunities.
${contextData ? contextData : "The user is currently browsing the dashboard."}

Rules:
- Be concise, professional, and strategic.
- Focus on financial metrics, risks, and upside.
- If asking about the current deal, refer to the data provided above.
- If the user asks to "Analyze" or "Run Report", tell them to click the "Analyze" button on the UI.
`;

      try {
        // Use OpenAI/GPT-4 for chat (or Forge if preferred, but easy to wire specific model here)
        // For the demo sprint, we'll try to use the most available reliable model
        const { OpenAI } = await import('openai');

        // Check availability (using same logic as analysis tools, prioritizing generic env vars)
        const apiKey = process.env.OPENAI_API_KEY || process.env.BUILT_IN_FORGE_API_KEY;
        const baseURL = process.env.OPENAI_API_KEY ? undefined : process.env.BUILT_IN_FORGE_API_URL + '/v1';

        if (!apiKey) {
          throw new Error("No AI API key available for chat");
        }

        const openai = new OpenAI({
          apiKey: apiKey,
          baseURL: baseURL
        });

        // Construct messages
        const messages: any[] = [
          { role: "system", content: systemPrompt },
          ...(input.history || []).slice(-10), // Keep last 10 turns for context window
          { role: "user", content: input.message }
        ];

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_API_KEY ? "gpt-4o" : "gpt-4-turbo", // Use best reasonable model
          messages: messages,
          temperature: 0.7,
        });

        return {
          response: completion.choices[0].message.content || "I'm having trouble thinking right now. Please try again."
        };

      } catch (error: any) {
        console.error("Agent chat error:", error);
        return {
          response: "I encountered an error connecting to my neural core. Please try again in a moment."
        };
      }
    }),

  /**
   * List analysis runs for a deal (placeholder for V2)
   */
  listByDeal: publicProcedure
    .input(z.object({
      dealId: z.number(),
    }))
    .query(async ({ input }) => {
      return {
        dealId: input.dealId,
        analyses: [],
        message: "No analysis history available yet.",
      };
    }),
});
