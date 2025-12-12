#!/usr/bin/env node
/**
 * Test script to validate AI API connectivity
 * Run with: node test-ai-apis.mjs
 */

console.log("🤖 Testing AI API Connectivity...\n");

// Test Perplexity
async function testPerplexity() {
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SONAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [{ role: "user", content: "Say 'test successful'" }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      console.log("✅ Perplexity API: Working");
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ Perplexity API: Failed (${response.status})`);
      console.log(`   Error: ${error.substring(0, 100)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Perplexity API: Error - ${error.message}`);
    return false;
  }
}

// Test OpenAI
async function testOpenAI() {
  try {
    const { OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Say 'test successful'" }],
      max_tokens: 10,
    });

    console.log("✅ OpenAI API: Working");
    return true;
  } catch (error) {
    console.log(`❌ OpenAI API: ${error.message.substring(0, 100)}`);
    return false;
  }
}

// Test Anthropic
async function testAnthropic() {
  try {
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 10,
      messages: [{ role: "user", content: "Say 'test successful'" }],
    });

    console.log("✅ Anthropic API: Working");
    return true;
  } catch (error) {
    console.log(`❌ Anthropic API: ${error.message.substring(0, 100)}`);
    return false;
  }
}

// Test Grok/xAI
async function testGrok() {
  try {
    const xaiSdk = await import('xai-sdk');
    const Client = xaiSdk.default;
    const client = new Client({ apiKey: process.env.XAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "grok-beta",
      messages: [{ role: "user", content: "Say 'test successful'" }],
    });

    console.log("✅ Grok API: Working");
    return true;
  } catch (error) {
    console.log(`❌ Grok API: ${error.message.substring(0, 100)}`);
    return false;
  }
}

// Test Gemini
async function testGemini() {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent("Say 'test successful'");
    const response = await result.response;

    console.log("✅ Gemini API: Working");
    return true;
  } catch (error) {
    console.log(`❌ Gemini API: ${error.message.substring(0, 100)}`);
    return false;
  }
}

// Run all tests
async function main() {
  const results = await Promise.allSettled([
    testPerplexity(),
    testOpenAI(),
    testAnthropic(),
    testGrok(),
    testGemini(),
  ]);

  const working = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
  const total = results.length;

  console.log(`\n📊 Summary: ${working}/${total} AI services working`);

  if (working === total) {
    console.log("🎉 All AI services are operational!");
  } else if (working > 0) {
    console.log("⚠️  Some AI services are not working. Analysis will use available services.");
  } else {
    console.log("❌ No AI services are working. Please check API keys.");
  }
}

main().catch(console.error);
