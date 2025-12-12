import { boolean, float, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Chat messages for AI Investment Advisor
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  propertyContext: text("propertyContext"), // JSON string with property details
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Deals/Opportunities
export const deals = mysqlTable("deals", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: int("price").notNull(), // in dollars
  stage: mysqlEnum("stage", ["draft", "lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"]).notNull(),
  score: int("score"), // 0-100 overall score
  contactName: varchar("contactName", { length: 255 }),
  contactType: varchar("contactType", { length: 50 }), // Broker, Owner, etc
  lastContact: timestamp("lastContact"),
  nextAction: varchar("nextAction", { length: 255 }),
  revenue: int("revenue"), // annual revenue
  cashFlow: int("cashFlow"), // annual cash flow
  sdeMargin: float("sdeMargin"), // SDE margin percentage
  aiPotential: int("aiPotential"), // AI optimization potential score 0-100
  certAdvantage: int("certAdvantage"), // SDVOSB certification advantage score 0-100
  opportunityZone: boolean("opportunityZone").default(false), // Is in Opportunity Zone
  notes: text("notes"), // Internal notes
  industry: varchar("industry", { length: 100 }),
  location: varchar("location", { length: 255 }),
  userId: int("userId"), // owner of the deal
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Deal = typeof deals.$inferSelect;
export type InsertDeal = typeof deals.$inferInsert;
// Market Scans History
export const marketScans = mysqlTable("marketScans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  jobId: varchar("jobId", { length: 255 }), // Gemini interaction ID
  filters: text("filters"), // JSON string of search filters
  status: mysqlEnum("status", ["running", "completed", "failed"]).notNull(),
  result: text("result"), // Full Gemini response
  listingsCount: int("listingsCount").default(0), // Number of listings found
  apiMode: mysqlEnum("apiMode", ["beta", "ga"]).default("beta"), // Which API was used
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type MarketScan = typeof marketScans.$inferSelect;
export type InsertMarketScan = typeof marketScans.$inferInsert;

// User Preferences for API Configuration
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  aiProvider: mysqlEnum("aiProvider", ["manus", "personal"]).default("manus"), // "manus" = Forge API (free tokens), "personal" = direct APIs
  geminiApiMode: mysqlEnum("geminiApiMode", ["beta", "ga"]).default("beta"),
  customPromptTemplate: text("customPromptTemplate"), // For GA mode
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;
