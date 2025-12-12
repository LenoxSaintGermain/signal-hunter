/**
 * Direct test of AI analysis functions without tRPC
 * This tests the AI API integrations directly
 */

console.log('🤖 Testing Multi-Model AI Analysis (Direct)\n');
console.log('Testing with Ponce Protocol deal data...\n');

const mockDeal = {
  id: 90003,
  name: 'Ponce Protocol - Hospitality Business with Real Estate',
  description: 'Historic hospitality property in Opportunity Zone with strong cash flow and real estate appreciation potential',
  industry: 'Hospitality / Real Estate',
  location: 'Druid Hills, Atlanta, GA',
  price: 850000,
  revenue: 109000,
  cashFlow: 85000,
  sdeMargin: 0.78,
  aiPotential: 85,
  certAdvantage: 90,
  opportunityZone: true,
  stage: 'due_diligence',
  notes: 'Prime Opportunity Zone location in Druid Hills. Historic property with verified $109K revenue, potential to reach $145K.',
};

async function testPerplexity() {
  console.log('1️⃣  Testing Perplexity Sonar Pro...');
  
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
            content: "You are an expert business acquisition analyst. Provide a brief market analysis."
          },
          {
            role: "user",
            content: `Analyze this acquisition: ${mockDeal.name} in ${mockDeal.location}. Industry: ${mockDeal.industry}. Price: $${mockDeal.price.toLocaleString()}. Provide a score (0-100) and brief analysis.`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    console.log('   ✅ Perplexity response received');
    console.log(`   📝 Analysis length: ${analysis.length} characters\n`);
    return true;
  } catch (error) {
    console.error('   ❌ Perplexity failed:', error.message);
    return false;
  }
}

async function testGemini() {
  console.log('2️⃣  Testing Google Gemini 2.0 Flash...');
  
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Analyze financial metrics for: ${mockDeal.name}. Price: $${mockDeal.price.toLocaleString()}, Revenue: $${mockDeal.revenue.toLocaleString()}. Provide a score (0-100) and brief analysis.`;
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();
    
    console.log('   ✅ Gemini response received');
    console.log(`   📝 Analysis length: ${analysis.length} characters\n`);
    return true;
  } catch (error) {
    console.error('   ❌ Gemini failed:', error.message);
    return false;
  }
}

async function testGrok() {
  console.log('3️⃣  Testing Grok Beta...');
  
  try {
    // @ts-ignore
    const xaiSdk = await import('xai-sdk');
    const Client = xaiSdk.default || xaiSdk.Client;
    const client = new Client({ apiKey: process.env.XAI_API_KEY! });

    const completion = await client.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: "You are a strategic acquisition advisor."
        },
        {
          role: "user",
          content: `Analyze strategic fit for: ${mockDeal.name}. AI Potential: ${mockDeal.aiPotential}/100, Opportunity Zone: ${mockDeal.opportunityZone}. Provide a score (0-100) and brief analysis.`
        }
      ],
    });

    const analysis = completion.choices[0].message.content || "";
    console.log('   ✅ Grok response received');
    console.log(`   📝 Analysis length: ${analysis.length} characters\n`);
    return true;
  } catch (error) {
    console.error('   ❌ Grok failed:', error.message);
    return false;
  }
}

async function testClaude() {
  console.log('4️⃣  Testing Claude 3.5 Sonnet...');
  
  try {
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Conduct due diligence for: ${mockDeal.name} in ${mockDeal.industry}. Price: $${mockDeal.price.toLocaleString()}, Stage: ${mockDeal.stage}. Provide a score (0-100) and brief analysis.`
        }
      ],
    });

    const analysis = message.content[0].type === 'text' ? message.content[0].text : "";
    console.log('   ✅ Claude response received');
    console.log(`   📝 Analysis length: ${analysis.length} characters\n`);
    return true;
  } catch (error) {
    console.error('   ❌ Claude failed:', error.message);
    return false;
  }
}

async function runTests() {
  const results = {
    perplexity: false,
    gemini: false,
    grok: false,
    claude: false,
  };

  results.perplexity = await testPerplexity();
  results.gemini = await testGemini();
  results.grok = await testGrok();
  results.claude = await testClaude();

  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('📊 Test Results Summary:\n');
  console.log(`   Perplexity: ${results.perplexity ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Gemini:     ${results.gemini ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Grok:       ${results.grok ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Claude:     ${results.claude ? '✅ PASS' : '❌ FAIL'}`);
  
  const passCount = Object.values(results).filter(Boolean).length;
  console.log(`\n   Total: ${passCount}/4 AI models working\n`);
  console.log('═══════════════════════════════════════════════════════════\n');

  if (passCount === 4) {
    console.log('🎉 All AI models are working correctly!\n');
  } else {
    console.log('⚠️  Some AI models failed. Check API keys and network connectivity.\n');
  }
}

runTests();
