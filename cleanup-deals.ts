import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import * as schema from './drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('📊 Current Deals in Database:\n');

const deals = await db.select().from(schema.deals);
console.log(`Total deals: ${deals.length}\n`);

deals.forEach((deal, index) => {
  console.log(`${index + 1}. ID: ${deal.id}`);
  console.log(`   Name: ${deal.name}`);
  console.log(`   Score: ${deal.score || 'N/A'}`);
  console.log(`   Price: ${deal.price ? `$${deal.price.toLocaleString()}` : 'N/A'}`);
  console.log(`   Revenue: ${deal.revenue ? `$${deal.revenue.toLocaleString()}` : 'N/A'}`);
  console.log(`   Stage: ${deal.stage}`);
  console.log(`   Industry: ${deal.industry || 'N/A'}`);
  console.log(`   Location: ${deal.location || 'N/A'}`);
  console.log('');
});

// Identify the 3 real opportunities we want to keep
const KEEP_IDS = [90003, 90004, 90005]; // Ponce Protocol, Whitehall Assemblage, 514 Whitehall

console.log('\n🗑️  Deals to Delete (incomplete/test data):\n');

const dealsToDelete = deals.filter(d => !KEEP_IDS.includes(d.id));
dealsToDelete.forEach(deal => {
  console.log(`   - ID ${deal.id}: ${deal.name}`);
});

if (dealsToDelete.length > 0) {
  console.log(`\n❌ Deleting ${dealsToDelete.length} incomplete deals...\n`);
  
  for (const deal of dealsToDelete) {
    await db.delete(schema.deals).where(eq(schema.deals.id, deal.id));
    console.log(`   ✅ Deleted: ${deal.name} (ID: ${deal.id})`);
  }
  
  console.log('\n✅ Cleanup complete!');
} else {
  console.log('\n✅ No deals to delete. Database is clean!');
}

// Verify final state
const finalDeals = await db.select().from(schema.deals);
console.log(`\n📊 Final deal count: ${finalDeals.length}`);
console.log('\nRemaining deals:');
finalDeals.forEach(d => {
  console.log(`   - ${d.name} (Score: ${d.score})`);
});

await connection.end();
