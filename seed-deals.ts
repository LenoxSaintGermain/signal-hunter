import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.js';

// Database connection
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('🌱 Seeding database with 3 real opportunities...\n');

const deals = [
  {
    name: 'Ponce Protocol - Hospitality Business with Real Estate',
    description: 'Historic hospitality property in Opportunity Zone with strong cash flow and real estate appreciation potential',
    price: 850000, // $850K
    stage: 'due_diligence',
    score: 92,
    contactName: 'TBD',
    contactType: 'Broker',
    lastContact: new Date('2024-12-01'),
    nextAction: 'Schedule property walkthrough',
    revenue: 109000, // $109K/yr verified
    cashFlow: 85000, // Estimated
    sdeMargin: 0.78, // 78% margin
    aiPotential: 85, // High AI optimization potential
    certAdvantage: 90, // Strong SDVOSB advantage
    opportunityZone: true,
    notes: 'Prime Opportunity Zone location in Druid Hills. Historic property with verified $109K revenue, potential to reach $145K. Strong cash flow, real estate appreciation upside, and AI optimization opportunities.',
    industry: 'Hospitality / Real Estate',
    location: 'Druid Hills, Atlanta, GA',
    userId: null, // Will be set to owner
  },
  {
    name: 'Whitehall Assemblage - 2.31 Acre Development Site',
    description: '2.31-acre assemblage in downtown Atlanta Opportunity Zone with massive development potential',
    price: 5500000, // $5.5M asking
    stage: 'initial_review',
    score: 88,
    contactName: 'TBD',
    contactType: 'Owner',
    lastContact: new Date('2024-11-28'),
    nextAction: 'Analyze zoning and development potential',
    revenue: 0, // Land development
    cashFlow: 0,
    sdeMargin: 0,
    aiPotential: 75,
    certAdvantage: 85,
    opportunityZone: true,
    notes: '2.31-acre assemblage in prime downtown location. Opportunity Zone benefits, high development potential. Requires detailed zoning analysis and development pro forma.',
    industry: 'Real Estate Development',
    location: 'Downtown Atlanta, GA',
    userId: null,
  },
  {
    name: '514 Whitehall St SW - Mixed-Use Property',
    description: 'Mixed-use property in downtown Atlanta with retail and residential potential',
    price: 1200000, // Estimated
    stage: 'lead',
    score: 85,
    contactName: 'TBD',
    contactType: 'Broker',
    lastContact: new Date('2024-11-25'),
    nextAction: 'Request financials and rent roll',
    revenue: 200000, // Estimated
    cashFlow: 150000, // Estimated
    sdeMargin: 0.75,
    aiPotential: 70,
    certAdvantage: 80,
    opportunityZone: true,
    notes: 'Mixed-use property in downtown Atlanta. Opportunity Zone location. Needs verification of current financials and tenant mix.',
    industry: 'Real Estate',
    location: 'Downtown Atlanta, GA',
    userId: null,
  },
];

try {
  // Insert deals
  for (const deal of deals) {
    const result = await db.insert(schema.deals).values(deal);
    console.log(`✅ Inserted: ${deal.name}`);
    console.log(`   ID: ${result[0].insertId}, Score: ${deal.score}, Stage: ${deal.stage}\n`);
  }

  console.log('🎉 Seeding complete! 3 opportunities added to database.\n');
  
  // Query to verify
  const allDeals = await db.select().from(schema.deals);
  console.log(`📊 Total deals in database: ${allDeals.length}\n`);
  
} catch (error) {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
} finally {
  await connection.end();
}
