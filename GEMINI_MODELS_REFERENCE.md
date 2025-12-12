# Gemini Models Reference (December 2024)

**Source:** https://ai.google.dev/gemini-api/docs/models  
**Last Updated:** December 12, 2024

## Current Gemini Models (JavaScript SDK Compatible)

### 🏆 Gemini 3 Pro Preview (NEWEST - November 2025)
**Model Code:** `gemini-3-pro-preview`

**Best For:**
- Most intelligent model for multimodal understanding
- State-of-the-art reasoning
- Agentic and vibe-coding tasks
- Complex financial analysis and investment decisions

**Capabilities:**
- ✅ Text, Image, Video, Audio, PDF inputs
- ✅ Function calling
- ✅ Code execution
- ✅ Search grounding
- ✅ Thinking mode
- ✅ Structured outputs
- ✅ Context caching
- ✅ File search
- ✅ URL context
- ❌ Image generation (use gemini-3-pro-image-preview instead)

**Token Limits:**
- Input: 1,048,576 tokens (1M)
- Output: 65,536 tokens

**Knowledge Cutoff:** January 2025

---

### ⚡ Gemini 2.5 Flash (RECOMMENDED FOR PRODUCTION)
**Model Code:** `gemini-2.5-flash`

**Best For:**
- Best price-performance ratio
- Large-scale processing
- Low-latency, high-volume tasks
- Agentic use cases
- Production applications

**Capabilities:**
- ✅ Text, images, video, audio inputs
- ✅ Function calling
- ✅ Code execution
- ✅ Search grounding
- ✅ Thinking mode
- ✅ Structured outputs
- ✅ Context caching
- ✅ Google Maps grounding
- ✅ File search

**Token Limits:**
- Input: 1,048,576 tokens (1M)
- Output: 65,536 tokens

**Knowledge Cutoff:** January 2025  
**Latest Update:** June 2025

---

### 🚀 Gemini 2.5 Flash-Lite (FASTEST)
**Model Code:** `gemini-2.5-flash-lite`

**Best For:**
- Cost-efficiency
- Ultra-high throughput
- Simple tasks requiring speed
- Batch processing

**Capabilities:**
- ✅ Text, image, video, audio, PDF inputs
- ✅ Function calling
- ✅ Code execution
- ✅ Search grounding
- ✅ Thinking mode
- ✅ Structured outputs
- ✅ Context caching
- ✅ Google Maps grounding
- ✅ File search

**Token Limits:**
- Input: 1,048,576 tokens (1M)
- Output: 65,536 tokens

**Knowledge Cutoff:** January 2025  
**Latest Update:** July 2025

---

### 🧠 Gemini 2.5 Pro (ADVANCED THINKING)
**Model Code:** `gemini-2.5-pro`

**Best For:**
- Complex reasoning over code, math, STEM
- Analyzing large datasets and codebases
- Long-context document analysis
- Advanced problem-solving

**Capabilities:**
- ✅ Audio, images, video, text, PDF inputs
- ✅ Function calling
- ✅ Code execution
- ✅ Search grounding
- ✅ Thinking mode
- ✅ Structured outputs
- ✅ Context caching
- ✅ Google Maps grounding
- ✅ File search

**Token Limits:**
- Input: 1,048,576 tokens (1M)
- Output: 65,536 tokens

**Knowledge Cutoff:** January 2025  
**Latest Update:** June 2025

---

### 🖼️ Gemini 3 Pro Image Preview (IMAGE GENERATION)
**Model Code:** `gemini-3-pro-image-preview`

**Best For:**
- Generating images from text prompts
- Image editing and manipulation
- Visual content creation

**Capabilities:**
- ✅ Image and text inputs
- ✅ Image and text outputs
- ✅ Image generation
- ✅ Thinking mode
- ✅ Structured outputs
- ❌ Function calling
- ❌ Code execution

**Token Limits:**
- Input: 65,536 tokens
- Output: 32,768 tokens

---

## Previous Generation (Still Supported)

### Gemini 2.0 Flash
**Model Code:** `gemini-2.0-flash`
- Second generation workhorse
- 1M token context window
- Knowledge cutoff: August 2024
- **Use 2.5 Flash instead for better performance**

### Gemini 2.0 Flash-Lite
**Model Code:** `gemini-2.0-flash-lite`
- Second generation fast model
- **Use 2.5 Flash-Lite instead**

---

## Recommended Model Selection for Acquisition Dashboard

### Financial Analysis (Deal Scoring)
**Use:** `gemini-3-pro-preview`  
**Why:** State-of-the-art reasoning for complex financial decisions

### Market Research (Deep Research Agent)
**Use:** `gemini-2.5-flash`  
**Why:** Best price-performance for large-scale data processing

### Simple Tasks (Quick Queries)
**Use:** `gemini-2.5-flash-lite`  
**Why:** Fastest and most cost-effective

### Document Analysis (Investment Memos)
**Use:** `gemini-2.5-pro`  
**Why:** Advanced thinking for long-context analysis

---

## JavaScript SDK Usage

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// For financial analysis
const model = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview" 
});

const result = await model.generateContent(prompt);
const analysis = result.response.text();
```

---

## Important Notes

1. **Model Versions:**
   - **Stable:** Production-ready, rarely changes (e.g., `gemini-2.5-flash`)
   - **Preview:** May be used for production, 2-week deprecation notice (e.g., `gemini-3-pro-preview`)
   - **Experimental:** Not for production, subject to change (e.g., `gemini-2.0-flash-exp`)

2. **Deprecations:**
   - Gemini 1.5 models are deprecated
   - Use Gemini 2.5 or 3.0 models instead

3. **Pricing:**
   - See official pricing page: https://ai.google.dev/gemini-api/docs/pricing
   - Preview models may have different pricing

---

## DO NOT USE (Outdated/Incorrect)

❌ `gemini-pro` - Deprecated  
❌ `gemini-1.5-pro` - Deprecated  
❌ `gemini-1.5-flash` - Deprecated  
❌ `gemini-2.0-flash-exp` - Experimental, use stable instead  
❌ `gemini-3-pro` - Doesn't exist (use `gemini-3-pro-preview`)
