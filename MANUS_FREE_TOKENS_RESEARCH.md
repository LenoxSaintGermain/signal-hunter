# Manus Free Tokens Campaign Research

## Campaign Overview

**Promotion:** 1 Trillion Free LLM Tokens
**URL:** https://manus.im/campaign/free-tokens
**Status:** Active (until 1T tokens depleted)
**Current Usage:** 350B+ tokens used (as of Dec 3, 2025)

## Key Details

### What's Covered
- **All LLM tokens** incurred by web apps built on Manus
- AI features: chatbots, image generation, text generation
- **First come, first build** - open to everyone

### Important Distinction
- **"Tokens"** = Free AI usage within Manus web apps (covered by campaign)
- **"Credits"** = Manus account credits for building websites (NOT covered, still consumed)

### Bonus Opportunity
- Share project with #BuiltwithManus on social media
- Get featured as use case
- **Earn 100,000 Manus Credits** (at least 50 creators selected)

## Review Criteria for Featured Projects
1. **Creativity** - Originality and uniqueness
2. **Practicality** - Real-world usefulness
3. **Execution** - Quality of build, design, UX
4. **Manus Mastery** - Effective use of Manus capabilities

## Eligibility for Acquisition Dashboard

### ✅ **YES - This App Qualifies!**

**Reasons:**
1. **AI-native web app** - Uses multiple AI models for deal analysis
2. **Real-world use case** - Business acquisition intelligence platform
3. **Practical value** - Solves actual problem for investors
4. **Multiple AI features:**
   - Multi-model deal analysis (5 AI models)
   - Market research automation (Gemini Deep Research)
   - Investment memo generation
   - AI-powered scoring and recommendations

### Built-in AI Features That Qualify
- ✅ Deal analysis with Perplexity, GPT-4, Claude, Grok, Gemini
- ✅ Market scanning with Gemini Deep Research Agent
- ✅ AI-powered opportunity scoring
- ✅ Automated investment thesis generation
- ✅ Risk assessment and recommendations

## Manus Forge API

### What is Manus Forge?
Based on project secrets, Manus provides a **Forge API** that acts as a proxy for AI services:

**Environment Variables Found:**
```
BUILT_IN_FORGE_API_KEY=xxx
BUILT_IN_FORGE_API_URL=https://api.manus.im/...
VITE_FRONTEND_FORGE_API_KEY=xxx
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/...
```

### How Forge API Works
1. **Unified endpoint** for multiple AI providers
2. **Token pooling** - Uses campaign's 1T token pool
3. **No individual API keys needed** - Manus handles provider auth
4. **Automatic billing** - Tokens deducted from shared pool

### Supported Models (Inferred)
Based on Manus documentation and comparisons:
- OpenAI (GPT-4, GPT-4 Turbo)
- Anthropic Claude (3.5 Sonnet, 3.7)
- Google Gemini (1.5 Pro, 2.5 Flash)
- Alibaba Qwen
- Possibly others (Perplexity, Grok)

## Implementation Strategy

### Option 1: Manus Forge API (Recommended for Promo)
**Pros:**
- ✅ Free tokens from 1T pool
- ✅ No personal API key costs
- ✅ Unified API endpoint
- ✅ Automatic provider management
- ✅ Qualifies for #BuiltwithManus bonus

**Cons:**
- ❌ Limited to campaign duration
- ❌ Shared pool (could run out)
- ❌ Less control over model selection
- ❌ Dependent on Manus infrastructure

### Option 2: Personal API Keys (Current Implementation)
**Pros:**
- ✅ Full control over models
- ✅ No dependency on Manus campaign
- ✅ Guaranteed availability
- ✅ Direct provider relationships

**Cons:**
- ❌ Costs money (API usage fees)
- ❌ Manage multiple API keys
- ❌ More complex error handling

### Option 3: Hybrid Approach (BEST)
**Architecture:**
```
Settings → AI Provider Toggle
  ├─ "Use Manus Free Tokens" (default during promo)
  │   └─ Forge API → Shared 1T pool
  └─ "Use Personal API Keys" (fallback/post-promo)
      └─ Direct API calls → User's keys
```

**Benefits:**
- ✅ Leverage free tokens during promo
- ✅ Seamless switch to personal keys later
- ✅ User choice and flexibility
- ✅ Graceful degradation if pool depletes

## Recommended Implementation Plan

### Phase 1: Add Forge API Integration
1. Create `server/services/forgeApi.ts` wrapper
2. Implement Forge API calls for all 5 AI models
3. Use existing `BUILT_IN_FORGE_API_KEY` and `BUILT_IN_FORGE_API_URL`
4. Test with current analysis endpoints

### Phase 2: Add Provider Switching
1. Add `aiProvider` field to `userPreferences` table
2. Create Settings UI toggle: "Manus Tokens" vs "Personal Keys"
3. Update `analysis.ts` to check preference before calling APIs
4. Add fallback logic (Forge → Personal Keys → Error)

### Phase 3: Optimize for #BuiltwithManus
1. Add prominent "Powered by Manus" badge
2. Create social sharing feature with #BuiltwithManus
3. Document AI features in README
4. Create demo video showcasing AI capabilities
5. Submit for featured use case consideration

### Phase 4: Post-Campaign Migration
1. Monitor token pool depletion
2. Notify users when pool is low
3. Prompt users to add personal API keys
4. Auto-switch to personal keys when Forge fails
5. Maintain both options indefinitely

## Cost Comparison

### During Promo (Manus Tokens)
- **Cost:** $0 (covered by 1T pool)
- **Estimated usage:** ~10K tokens per analysis × 100 analyses = 1M tokens
- **Value:** ~$1-5 depending on models used

### Post-Promo (Personal Keys)
- **OpenAI GPT-4:** $0.03/1K input + $0.06/1K output
- **Claude Sonnet 4.5:** $0.015/1K input + $0.075/1K output
- **Perplexity Sonar Pro:** $0.005/1K tokens
- **Estimated cost per analysis:** $0.10-0.30
- **100 analyses/month:** $10-30/month

## Next Steps

1. **Implement Forge API wrapper** (2-3 hours)
2. **Add provider toggle in Settings** (1-2 hours)
3. **Test with Manus tokens** (30 min)
4. **Document for #BuiltwithManus submission** (1 hour)
5. **Create demo video** (2-3 hours)
6. **Submit for featured use case** (30 min)

## Questions to Research Further

- [ ] Does Forge API support all 5 models we use?
- [ ] What's the rate limit on Forge API?
- [ ] How to track token usage per user?
- [ ] Can we use Forge for Gemini Deep Research Agent?
- [ ] What happens when 1T pool depletes?
- [ ] How to get API documentation for Forge?

## Conclusion

**YES - This app qualifies for Manus free tokens!**

The acquisition dashboard is an excellent candidate for the campaign:
- Real AI-native features (not just chatbot)
- Practical business use case
- High-quality execution
- Effective use of multiple AI models

**Recommended:** Implement hybrid approach to leverage free tokens now while maintaining ability to switch to personal keys later.
