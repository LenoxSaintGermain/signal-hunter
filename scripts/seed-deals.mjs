import { drizzle } from "drizzle-orm/mysql2";
import { deals } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const sampleDeals = [
  {
    name: "Stadium Plaza Mixed-Use",
    description: "Prime mixed-use development adjacent to professional sports venue. 45K SF retail + 120 residential units. Strong foot traffic on game days (82 home games/year). Current tenants include sports bar, team merchandise store, and quick-service restaurants.",
    price: 12500000,
    location: "Downtown Sports District",
    stage: "due_diligence",
    score: 87,
    cashFlow: 950000,
    revenue: 3200000,
    sdeMargin: 29.7,
    aiPotential: 35,
    certAdvantage: 20,
    opportunityZone: true,
    notes: "Seller motivated due to portfolio rebalancing. Phase I ESA clean. Zoning allows for additional 2 stories (residential expansion opportunity).",
  },
  {
    name: "Government Contractor - IT Services",
    description: "Established IT services firm with 15-year track record serving federal agencies. $8M annual revenue, 65% from GSA Schedule contracts. CMMI Level 3 certified. Strong cybersecurity practice (FedRAMP authorized). 45 FTEs, low employee turnover.",
    price: 5800000,
    location: "Washington DC Metro",
    stage: "initial_review",
    score: 82,
    cashFlow: 1200000,
    revenue: 8000000,
    sdeMargin: 15.0,
    aiPotential: 45,
    certAdvantage: 30,
    opportunityZone: false,
    notes: "SDVOSB set-aside opportunities worth $12M in pipeline. Owner retiring, willing to stay on for 12-month transition. Clean financials, no customer concentration risk.",
  },
  {
    name: "Multifamily - Opportunity Zone",
    description: "124-unit workforce housing complex in designated Opportunity Zone. Built 2018, Class B+ quality. 94% occupancy, stable tenant base. Property management in place. Recent capital improvements: new HVAC systems, energy-efficient windows.",
    price: 18900000,
    location: "Emerging Urban Corridor",
    stage: "offer_submitted",
    score: 79,
    cashFlow: 1350000,
    revenue: 2800000,
    sdeMargin: 48.2,
    aiPotential: 25,
    certAdvantage: 10,
    opportunityZone: true,
    notes: "QOF structure available. 10-year hold eliminates capital gains on appreciation. Rent growth potential 4-5% annually based on market comps. City planning shows major infrastructure investment nearby.",
  },
  {
    name: "Regional Logistics Hub",
    description: "180K SF warehouse and distribution center with Class A specifications. 32' clear height, 60 dock doors, ESFR sprinkler system. Located at I-95/I-295 interchange. Current tenant: national 3PL provider (5 years remaining on lease, 2x5-year options).",
    price: 24000000,
    location: "Mid-Atlantic Distribution Corridor",
    stage: "negotiation",
    score: 85,
    cashFlow: 1680000,
    revenue: 2100000,
    sdeMargin: 80.0,
    aiPotential: 30,
    certAdvantage: 15,
    opportunityZone: false,
    notes: "Triple-net lease, tenant responsible for all operating expenses. Cap rate: 7.0%. Expansion land available (additional 100K SF developable). E-commerce tailwinds driving demand.",
  },
  {
    name: "SBA Pre-Qualified Manufacturing",
    description: "Precision machining and fabrication business serving aerospace and defense sectors. AS9100D certified. $4.2M annual revenue, 80% repeat customers. Modern CNC equipment (5-axis machines), low CapEx requirements. 22 skilled employees.",
    price: 3200000,
    location: "Southeast Manufacturing Belt",
    stage: "initial_review",
    score: 76,
    cashFlow: 720000,
    revenue: 4200000,
    sdeMargin: 17.1,
    aiPotential: 40,
    certAdvantage: 35,
    opportunityZone: false,
    notes: "SBA 7(a) pre-approval for $2.5M (10% down). SDVOSB certification opens DoD set-aside market ($18M annual opportunity). Owner willing to consult post-sale. Facility lease favorable (5 years remaining, below-market rate).",
  },
];

async function seedDeals() {
  try {
    console.log("🌱 Seeding deals...");
    
    for (const deal of sampleDeals) {
      await db.insert(deals).values(deal);
      console.log(`✅ Inserted: ${deal.name}`);
    }
    
    console.log("✅ All deals seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding deals:", error);
    process.exit(1);
  }
}

seedDeals();
