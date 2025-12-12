import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server/routers';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function testAIAnalysis() {
  console.log('🤖 Testing Multi-Model AI Analysis\n');
  console.log('Deal: Ponce Protocol (ID: 90003)\n');
  console.log('Starting analysis with 4 AI models...\n');
  
  try {
    const result = await trpc.analysis.trigger.mutate({
      dealId: 90003,
    });
    
    console.log('✅ Analysis Complete!\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log(`📊 Overall Score: ${result.overallScore}/100`);
    console.log(`🎯 Confidence: ${(result.confidence * 100).toFixed(0)}%`);
    console.log(`💡 Consensus: ${result.consensus.toUpperCase().replace('_', ' ')}\n`);
    console.log(`📝 Summary:\n${result.summary}\n`);
    
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('🔍 Individual Model Results:\n');
    
    result.models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.model}`);
      console.log(`   Score: ${model.score}/100`);
      console.log(`   Confidence: ${(model.confidence * 100).toFixed(0)}%`);
      console.log(`   Recommendation: ${model.recommendation.toUpperCase().replace('_', ' ')}`);
      console.log(`   Strengths: ${model.strengths.length} identified`);
      console.log(`   Risks: ${model.risks.length} identified\n`);
    });
    
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('💪 Top Strengths:\n');
    result.topStrengths.forEach((strength, index) => {
      console.log(`   ${index + 1}. ${strength}`);
    });
    
    console.log('\n⚠️  Top Risks:\n');
    result.topRisks.forEach((risk, index) => {
      console.log(`   ${index + 1}. ${risk}`);
    });
    
    console.log('\n═══════════════════════════════════════════════════════════\n');
    console.log('🎉 Test Complete!\n');
    
  } catch (error) {
    console.error('❌ Analysis Failed:', error);
    process.exit(1);
  }
}

testAIAnalysis();
