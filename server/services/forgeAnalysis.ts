/**
 * Forge API Analysis Wrappers
 * 
 * These functions call the Manus Forge API and parse responses into
 * the AIAnalysisResult format expected by the analysis router.
 */

import * as ForgeAPI from "./forgeApi";

interface AIAnalysisResult {
  model: string;
  score: number; // 0-100
  confidence: number; // 0-1
  reasoning: string;
  strengths: string[];
  risks: string[];
  recommendation: "strong_buy" | "buy" | "hold" | "pass";
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
 * Parse AI response to extract score and recommendation
 */
function parseAnalysis(analysis: string): { score: number; recommendation: "strong_buy" | "buy" | "hold" | "pass" } {
  const scoreMatch = analysis.match(/score[:\s]+(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

  const recommendationMatch = analysis.match(/(strong_buy|buy|hold|pass)/i);
  const recommendation = (recommendationMatch?.[1]?.toLowerCase() as any) || "hold";

  return { score, recommendation };
}

/**
 * Analyze with Perplexity via Forge API
 */
export async function analyzeWithPerplexityForge(dealData: any): Promise<AIAnalysisResult> {
  try {
    const analysis = await ForgeAPI.analyzeWithPerplexityForge(dealData);
    const { score, recommendation } = parseAnalysis(analysis);

    return {
      model: "Perplexity Sonar Pro (Manus)",
      score,
      confidence: 0.85,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Perplexity Forge analysis failed:", error);
    return {
      model: "Perplexity Sonar Pro (Manus)",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - Forge API error",
      strengths: [],
      risks: ["Forge API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Analyze with GPT-4 via Forge API
 */
export async function analyzeWithGPT4Forge(dealData: any): Promise<AIAnalysisResult> {
  try {
    const analysis = await ForgeAPI.analyzeWithGPT4Forge(dealData);
    const { score, recommendation } = parseAnalysis(analysis);

    return {
      model: "OpenAI GPT-4 (Manus)",
      score,
      confidence: 0.93,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("GPT-4 Forge analysis failed:", error);
    return {
      model: "OpenAI GPT-4 (Manus)",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - Forge API error",
      strengths: [],
      risks: ["Forge API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Analyze with Gemini via Forge API
 */
export async function analyzeWithGeminiForge(dealData: any): Promise<AIAnalysisResult> {
  try {
    const analysis = await ForgeAPI.analyzeWithGeminiForge(dealData);
    const { score, recommendation } = parseAnalysis(analysis);

    return {
      model: "Google Gemini 2.5 Flash (Manus)",
      score,
      confidence: 0.9,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Gemini Forge analysis failed:", error);
    return {
      model: "Google Gemini 2.5 Flash (Manus)",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - Forge API error",
      strengths: [],
      risks: ["Forge API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Analyze with Grok via Forge API
 */
export async function analyzeWithGrokForge(dealData: any): Promise<AIAnalysisResult> {
  try {
    const analysis = await ForgeAPI.analyzeWithGrokForge(dealData);
    const { score, recommendation } = parseAnalysis(analysis);

    return {
      model: "Grok Beta (Manus)",
      score,
      confidence: 0.88,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Grok Forge analysis failed:", error);
    return {
      model: "Grok Beta (Manus)",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - Forge API error",
      strengths: [],
      risks: ["Forge API analysis failed"],
      recommendation: "hold",
    };
  }
}

/**
 * Analyze with Claude via Forge API
 */
export async function analyzeWithClaudeForge(dealData: any): Promise<AIAnalysisResult> {
  try {
    const analysis = await ForgeAPI.analyzeWithClaudeForge(dealData);
    const { score, recommendation } = parseAnalysis(analysis);

    return {
      model: "Claude Sonnet 4.5 (Manus)",
      score,
      confidence: 0.92,
      reasoning: analysis,
      strengths: extractBulletPoints(analysis, "strength"),
      risks: extractBulletPoints(analysis, "risk"),
      recommendation,
    };
  } catch (error) {
    console.error("Claude Forge analysis failed:", error);
    return {
      model: "Claude Sonnet 4.5 (Manus)",
      score: 70,
      confidence: 0.5,
      reasoning: "Analysis unavailable - Forge API error",
      strengths: [],
      risks: ["Forge API analysis failed"],
      recommendation: "hold",
    };
  }
}
