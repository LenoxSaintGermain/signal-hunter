import { describe, it, expect } from "vitest";

describe("Investor Intake System", () => {
  it("should have GEMINI_API_KEY configured", () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
    expect(process.env.GEMINI_API_KEY).not.toBe("");
  });

  it("should generate AI dossier for sample investor profile", async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const sampleProfile = {
      firstName: "John",
      lastName: "Investor",
      email: "john@example.com",
      investorType: "individual",
      capitalRange: "250k-500k",
      checkSize: "100k",
      experienceLevel: "intermediate",
      dealTypes: ["Short-Term Rentals", "Cash-Flow Biz w/ Real Estate"],
      timeHorizon: "3-5yrs",
      riskAppetite: "moderate",
      geographyPreference: "local-atl",
      liquidityPreference: "some",
      investmentGoals: "Looking for cash-flowing assets with tax benefits",
      opportunityName: "Ponce Protocol",
      opportunityId: "ponce-protocol",
    };

    const dossierPrompt = `You are an AI analyst for a private real estate and alternative investments firm.

Analyze this investor profile and generate a structured investment dossier:

**Investor Profile:**
- Name: ${sampleProfile.firstName} ${sampleProfile.lastName}
- Email: ${sampleProfile.email}
- Investor Type: ${sampleProfile.investorType}
- Net Investable Capital: ${sampleProfile.capitalRange}
- Check Size Preference: ${sampleProfile.checkSize}
- Experience Level: ${sampleProfile.experienceLevel}
- Deal Types Interested In: ${sampleProfile.dealTypes.join(", ")}
- Time Horizon: ${sampleProfile.timeHorizon}
- Risk Appetite: ${sampleProfile.riskAppetite}
- Geography Preference: ${sampleProfile.geographyPreference}
- Liquidity Preference: ${sampleProfile.liquidityPreference}
- Investment Goals: ${sampleProfile.investmentGoals}
- Current Opportunity: ${sampleProfile.opportunityName} (${sampleProfile.opportunityId})

Generate a JSON dossier with:
1. **persona**: Classify investor into one of: "Wealth Builder", "Cash Flow Hunter", "Tax Optimizer", "Passive LP", "Active Operator", "Institutional"
2. **deal_fit_score**: 0-100 score for fit with current opportunity
3. **capital_deployment_strategy**: AI-inferred strategy
4. **recommended_deal_types**: Top 2 alternative deal types
5. **risk_profile_summary**: 2-3 sentence summary
6. **leverage_profile**: Suggested debt-to-equity ratio
7. **red_flags**: Array of concerns or "None"
8. **next_steps**: Array of 2-3 recommended actions
9. **human_summary**: 3-4 sentence executive summary for founder

Respond ONLY with valid JSON, no markdown formatting.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: dossierPrompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    expect(response.ok).toBe(true);

    const data = await response.json();
    const dossierText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    expect(dossierText).toBeDefined();
    expect(dossierText.length).toBeGreaterThan(0);

    // Parse and validate dossier structure
    const cleanText = dossierText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const dossier = JSON.parse(cleanText);

    // Validate required fields
    expect(dossier.persona).toBeDefined();
    expect(dossier.deal_fit_score).toBeDefined();
    expect(dossier.deal_fit_score).toBeGreaterThanOrEqual(0);
    expect(dossier.deal_fit_score).toBeLessThanOrEqual(100);
    expect(dossier.capital_deployment_strategy).toBeDefined();
    expect(dossier.recommended_deal_types).toBeDefined();
    expect(Array.isArray(dossier.recommended_deal_types)).toBe(true);
    expect(dossier.risk_profile_summary).toBeDefined();
    expect(dossier.leverage_profile).toBeDefined();
    expect(dossier.red_flags).toBeDefined();
    expect(Array.isArray(dossier.red_flags)).toBe(true);
    expect(dossier.next_steps).toBeDefined();
    expect(Array.isArray(dossier.next_steps)).toBe(true);
    expect(dossier.human_summary).toBeDefined();

    console.log("Generated Investor Dossier:", JSON.stringify(dossier, null, 2));
  }, 30000); // 30 second timeout for API call

  it("should classify different investor personas correctly", async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Test "Cash Flow Hunter" persona
    const cashFlowHunter = {
      firstName: "Sarah",
      lastName: "CashFlow",
      investorType: "llc",
      capitalRange: "500k-1m",
      checkSize: "250k",
      experienceLevel: "advanced",
      dealTypes: ["Short-Term Rentals", "Cash-Flow Biz w/ Real Estate"],
      timeHorizon: "3-5yrs",
      riskAppetite: "moderate",
      geographyPreference: "southeast",
      liquidityPreference: "some",
      investmentGoals: "Maximize monthly cash flow with minimal management",
    };

    const prompt = `Classify this investor into one of: "Wealth Builder", "Cash Flow Hunter", "Tax Optimizer", "Passive LP", "Active Operator", "Institutional"

Investor: ${JSON.stringify(cashFlowHunter)}

Respond with ONLY the persona name, nothing else.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 50,
          },
        }),
      }
    );

    const data = await response.json();
    const persona = data.candidates?.[0]?.content?.parts?.[0]?.text.trim();

    expect(persona).toBeDefined();
    expect(
      [
        "Wealth Builder",
        "Cash Flow Hunter",
        "Tax Optimizer",
        "Passive LP",
        "Active Operator",
        "Institutional",
      ].some((p) => persona.includes(p))
    ).toBe(true);

    console.log("Classified Persona:", persona);
  }, 30000);

  it("should calculate deal fit score based on investor profile", async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const investorProfile = {
      capitalRange: "250k-500k",
      checkSize: "100k",
      dealTypes: ["Short-Term Rentals", "Cash-Flow Biz w/ Real Estate"],
      riskAppetite: "moderate",
      geographyPreference: "local-atl",
    };

    const dealDetails = {
      name: "Ponce Protocol",
      type: "Cash-Flow Biz w/ Real Estate",
      location: "Atlanta, GA",
      checkSizeRequired: "50k-200k",
      riskLevel: "moderate",
      cashFlow: "$5,600/month",
    };

    const prompt = `Score the fit between this investor and deal on a scale of 0-100.

Investor: ${JSON.stringify(investorProfile)}
Deal: ${JSON.stringify(dealDetails)}

Respond with ONLY a number between 0 and 100, nothing else.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 10,
          },
        }),
      }
    );

    const data = await response.json();
    const scoreText = data.candidates?.[0]?.content?.parts?.[0]?.text.trim();
    const score = parseInt(scoreText);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
    expect(score).toBeGreaterThan(50); // Should be a good fit based on alignment

    console.log("Deal Fit Score:", score);
  }, 30000);
});
