/**
 * Manus Forge API Wrapper
 * 
 * Provides unified access to multiple AI models through Manus's Forge API,
 * leveraging the 1 Trillion free tokens campaign.
 * 
 * Supported models:
 * - OpenAI GPT-4
 * - Anthropic Claude Sonnet 4.5
 * - Google Gemini 2.5 Flash/Pro
 * - Perplexity Sonar Pro
 * - xAI Grok
 */


const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL || "https://api.manus.im";

interface ForgeCompletionRequest {
  model: string;
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface ForgeCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Call Manus Forge API for chat completions
 */
async function callForgeAPI(request: ForgeCompletionRequest): Promise<ForgeCompletionResponse> {
  const apiKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!apiKey) {
    throw new Error("Manus Forge API key not configured");
  }

  const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Forge API error (${response.status}): ${error}`);
  }

  return response.json();
}

/**
 * Analyze deal with GPT-4 via Forge API
 */
export async function analyzeWithGPT4Forge(dealData: any): Promise<string> {
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

  const response = await callForgeAPI({
    model: "gpt-4",
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
    max_tokens: 2048,
  });

  return response.choices[0].message.content;
}

/**
 * Analyze deal with Claude via Forge API
 */
export async function analyzeWithClaudeForge(dealData: any): Promise<string> {
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

  const response = await callForgeAPI({
    model: "claude-sonnet-4-5",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });

  return response.choices[0].message.content;
}

/**
 * Analyze deal with Gemini via Forge API
 */
export async function analyzeWithGeminiForge(dealData: any): Promise<string> {
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

  const response = await callForgeAPI({
    model: "gemini-2.5-flash",  // Using stable model instead of preview
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });

  return response.choices[0].message.content;
}

/**
 * Analyze deal with Perplexity via Forge API
 */
export async function analyzeWithPerplexityForge(dealData: any): Promise<string> {
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

  const response = await callForgeAPI({
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
    max_tokens: 2048,
  });

  return response.choices[0].message.content;
}

/**
 * Analyze deal with Grok via Forge API
 */
export async function analyzeWithGrokForge(dealData: any): Promise<string> {
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

  const response = await callForgeAPI({
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
    temperature: 0.3,
    max_tokens: 2048,
  });

  return response.choices[0].message.content;
}

/**
 * Check if Forge API is available
 */
export function isForgeAPIAvailable(): boolean {
  return Boolean(process.env.BUILT_IN_FORGE_API_KEY && FORGE_API_URL);
}

/**
 * Get Forge API status
 */
export async function getForgeAPIStatus(): Promise<{
  available: boolean;
  endpoint: string;
  configured: boolean;
}> {
  return {
    available: isForgeAPIAvailable(),
    endpoint: FORGE_API_URL,
    configured: Boolean(process.env.BUILT_IN_FORGE_API_KEY),
  };
}
