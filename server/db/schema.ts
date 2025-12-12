import { pgTable, uuid, varchar, text, numeric, boolean, timestamp, jsonb, integer, date, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==================== USERS TABLE ====================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('viewer'),
  avatar_url: text('avatar_url'),
  team_id: uuid('team_id'),
  
  // V2 Extensions
  investment_goals: jsonb('investment_goals'), // {target_irr, hold_period, sector_preferences}
  risk_tolerance: varchar('risk_tolerance', { length: 50 }), // 'conservative' | 'moderate' | 'aggressive'
  capital_available: numeric('capital_available', { precision: 15, scale: 2 }),
  preferences: jsonb('preferences'),
  notification_settings: jsonb('notification_settings'),
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
}));

// ==================== DEAL PIPELINE TABLE ====================
export const dealPipeline = pgTable('deal_pipeline', {
  id: uuid('id').primaryKey().defaultRandom(),
  business_name: varchar('business_name', { length: 500 }).notNull(),
  description: text('description'),
  
  // Financials
  asking_price: numeric('asking_price', { precision: 15, scale: 2 }),
  revenue: numeric('revenue', { precision: 15, scale: 2 }),
  profit: numeric('profit', { precision: 15, scale: 2 }),
  cash_flow: numeric('cash_flow', { precision: 15, scale: 2 }),
  ebitda: numeric('ebitda', { precision: 15, scale: 2 }),
  
  // Location
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 100 }),
  country: varchar('country', { length: 100 }).default('USA'),
  lat: numeric('lat', { precision: 10, scale: 8 }),
  lng: numeric('lng', { precision: 11, scale: 8 }),
  
  // Scoring & Intelligence
  composite_score: numeric('composite_score', { precision: 3, scale: 2 }).default('0.00').notNull(),
  financial_health_score: numeric('financial_health_score', { precision: 3, scale: 2 }),
  strategic_fit_score: numeric('strategic_fit_score', { precision: 3, scale: 2 }),
  market_opportunity_score: numeric('market_opportunity_score', { precision: 3, scale: 2 }),
  risk_score: numeric('risk_score', { precision: 3, scale: 2 }),
  
  score_components: jsonb('score_components'), // {financial, location, growth, risk}
  ai_scenarios: jsonb('ai_scenarios'), // {optimistic, base, pessimistic}
  red_flags: jsonb('red_flags'), // string[]
  opportunities: jsonb('opportunities'), // string[]
  
  // AI Analysis Results
  ai_executive_summary: text('ai_executive_summary'),
  ai_financial_analysis: jsonb('ai_financial_analysis'),
  ai_strategic_analysis: jsonb('ai_strategic_analysis'),
  ai_risk_analysis: jsonb('ai_risk_analysis'),
  ai_market_pulse: jsonb('ai_market_pulse'),
  confidence_score: integer('confidence_score'), // 0-100
  last_analyzed_at: timestamp('last_analyzed_at'),
  
  // Source Metadata
  source: varchar('source', { length: 255 }).notNull(),
  source_url: text('source_url'),
  source_id: varchar('source_id', { length: 255 }),
  scraped_at: timestamp('scraped_at'),
  
  // Workflow
  status: varchar('status', { length: 50 }).notNull().default('new'),
  stage: varchar('stage', { length: 50 }).notNull().default('discovery'),
  assigned_to: uuid('assigned_to').references(() => users.id),
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  compositeScoreIdx: index('deal_composite_score_idx').on(table.composite_score),
  statusIdx: index('deal_status_idx').on(table.status),
  stageIdx: index('deal_stage_idx').on(table.stage),
  sourceIdx: index('deal_source_idx').on(table.source),
  sourceUniqueIdx: uniqueIndex('deal_source_unique_idx').on(table.source, table.source_id),
}));

// ==================== ANALYSIS RUNS TABLE ====================
export const analysisRuns = pgTable('analysis_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').notNull().references(() => dealPipeline.id, { onDelete: 'cascade' }),
  
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  trigger_type: varchar('trigger_type', { length: 50 }), // 'auto' | 'manual' | 'scheduled'
  
  // Model Execution Tracking
  models_used: jsonb('models_used'), // {gpt5: 'completed', claude: 'completed', ...}
  items_processed: integer('items_processed').default(0).notNull(),
  total_items: integer('total_items'),
  
  // Results
  results: jsonb('results'),
  error_message: text('error_message'),
  
  started_at: timestamp('started_at'),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('analysis_deal_idx').on(table.deal_id),
  statusIdx: index('analysis_status_idx').on(table.status),
}));

// ==================== MARKET DATA TABLE ====================
export const marketData = pgTable('market_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  source: varchar('source', { length: 255 }).notNull(),
  source_id: varchar('source_id', { length: 255 }),
  source_url: text('source_url'),
  
  raw_data: jsonb('raw_data').notNull(),
  normalized_data: jsonb('normalized_data'),
  
  processed: boolean('processed').default(false).notNull(),
  deal_id: uuid('deal_id').references(() => dealPipeline.id),
  
  scraped_at: timestamp('scraped_at').defaultNow().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sourceIdx: index('market_source_idx').on(table.source),
  processedIdx: index('market_processed_idx').on(table.processed),
  sourceUniqueIdx: uniqueIndex('market_source_unique_idx').on(table.source, table.source_id),
}));

// ==================== DEAL COMMENTS TABLE ====================
export const dealComments = pgTable('deal_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').notNull().references(() => dealPipeline.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id),
  
  content: text('content').notNull(),
  mentions: jsonb('mentions'), // UUID[]
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('comment_deal_idx').on(table.deal_id),
  userIdx: index('comment_user_idx').on(table.user_id),
}));

// ==================== ASSETS TABLE ====================
export const assets = pgTable('assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').notNull().references(() => dealPipeline.id),
  
  acquisition_date: date('acquisition_date').notNull(),
  purchase_price: numeric('purchase_price', { precision: 15, scale: 2 }).notNull(),
  current_value: numeric('current_value', { precision: 15, scale: 2 }),
  
  // Performance Tracking
  kpis: jsonb('kpis'), // {current_revenue, current_profit, occupancy_rate, ...}
  
  // 100-Day Plan
  integration_status: varchar('integration_status', { length: 50 }).notNull().default('planning'),
  day_100_plan: jsonb('day_100_plan'), // {phase1: [...tasks], phase2: [...], phase3: [...]}
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('asset_deal_idx').on(table.deal_id),
  statusIdx: index('asset_status_idx').on(table.integration_status),
}));

// ==================== CAPITAL STACK CONFIGS TABLE ====================
export const capitalStackConfigs = pgTable('capital_stack_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').notNull().references(() => dealPipeline.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').references(() => users.id),
  
  name: varchar('name', { length: 255 }), // 'Conservative', 'Aggressive', etc.
  
  // Financing Levers (Percentages)
  equity_percent: numeric('equity_percent', { precision: 5, scale: 2 }).notNull(),
  seller_note_percent: numeric('seller_note_percent', { precision: 5, scale: 2 }).notNull(),
  sba_7a_percent: numeric('sba_7a_percent', { precision: 5, scale: 2 }).notNull(),
  conventional_loan_percent: numeric('conventional_loan_percent', { precision: 5, scale: 2 }).notNull(),
  
  // Calculated Outputs
  total_capital_required: numeric('total_capital_required', { precision: 15, scale: 2 }).notNull(),
  cash_on_cash_return: numeric('cash_on_cash_return', { precision: 5, scale: 2 }),
  irr: numeric('irr', { precision: 5, scale: 2 }),
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('capital_deal_idx').on(table.deal_id),
}));

// ==================== PERFORMANCE PROJECTIONS TABLE ====================
export const performanceProjections = pgTable('performance_projections', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').notNull().references(() => dealPipeline.id, { onDelete: 'cascade' }),
  
  scenario_type: varchar('scenario_type', { length: 50 }).notNull(), // 'conservative' | 'base' | 'aggressive'
  
  // 5-Year Projections (Arrays stored as JSONB)
  revenue_projections: jsonb('revenue_projections').notNull(), // number[]
  profit_projections: jsonb('profit_projections').notNull(), // number[]
  cash_flow_projections: jsonb('cash_flow_projections').notNull(), // number[]
  
  assumptions: jsonb('assumptions'), // {growth_rate, margin_improvement, ...}
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('projection_deal_idx').on(table.deal_id),
}));

// ==================== TASKS TABLE ====================
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  deal_id: uuid('deal_id').references(() => dealPipeline.id, { onDelete: 'cascade' }),
  asset_id: uuid('asset_id').references(() => assets.id, { onDelete: 'cascade' }),
  
  assigned_to: uuid('assigned_to').references(() => users.id),
  
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  
  // 100-Day Plan Integration
  plan_phase: varchar('plan_phase', { length: 50 }), // 'phase1' | 'phase2' | 'phase3'
  day_range: varchar('day_range', { length: 50 }), // '1-30' | '31-60' | '61-100'
  
  due_date: date('due_date'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  priority: varchar('priority', { length: 50 }).notNull().default('medium'),
  
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  dealIdx: index('task_deal_idx').on(table.deal_id),
  assetIdx: index('task_asset_idx').on(table.asset_id),
  assignedIdx: index('task_assigned_idx').on(table.assigned_to),
  statusIdx: index('task_status_idx').on(table.status),
}));

// ==================== ACTIVITY LOG TABLE ====================
export const activityLog = pgTable('activity_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  deal_id: uuid('deal_id').references(() => dealPipeline.id, { onDelete: 'cascade' }),
  asset_id: uuid('asset_id').references(() => assets.id, { onDelete: 'cascade' }),
  
  action_type: varchar('action_type', { length: 100 }).notNull(),
  description: text('description').notNull(),
  metadata: jsonb('metadata'),
  
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('activity_user_idx').on(table.user_id),
  dealIdx: index('activity_deal_idx').on(table.deal_id),
  typeIdx: index('activity_type_idx').on(table.action_type),
  createdIdx: index('activity_created_idx').on(table.created_at),
}));

// ==================== RELATIONS ====================
export const usersRelations = relations(users, ({ many }) => ({
  assignedDeals: many(dealPipeline),
  comments: many(dealComments),
  tasks: many(tasks),
  activities: many(activityLog),
  capitalStackConfigs: many(capitalStackConfigs),
}));

export const dealPipelineRelations = relations(dealPipeline, ({ one, many }) => ({
  assignedUser: one(users, {
    fields: [dealPipeline.assigned_to],
    references: [users.id],
  }),
  analysisRuns: many(analysisRuns),
  comments: many(dealComments),
  assets: many(assets),
  capitalStackConfigs: many(capitalStackConfigs),
  performanceProjections: many(performanceProjections),
  tasks: many(tasks),
  activities: many(activityLog),
  marketData: many(marketData),
}));

export const analysisRunsRelations = relations(analysisRuns, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [analysisRuns.deal_id],
    references: [dealPipeline.id],
  }),
}));

export const marketDataRelations = relations(marketData, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [marketData.deal_id],
    references: [dealPipeline.id],
  }),
}));

export const dealCommentsRelations = relations(dealComments, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [dealComments.deal_id],
    references: [dealPipeline.id],
  }),
  user: one(users, {
    fields: [dealComments.user_id],
    references: [users.id],
  }),
}));

export const assetsRelations = relations(assets, ({ one, many }) => ({
  deal: one(dealPipeline, {
    fields: [assets.deal_id],
    references: [dealPipeline.id],
  }),
  tasks: many(tasks),
  activities: many(activityLog),
}));

export const capitalStackConfigsRelations = relations(capitalStackConfigs, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [capitalStackConfigs.deal_id],
    references: [dealPipeline.id],
  }),
  user: one(users, {
    fields: [capitalStackConfigs.user_id],
    references: [users.id],
  }),
}));

export const performanceProjectionsRelations = relations(performanceProjections, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [performanceProjections.deal_id],
    references: [dealPipeline.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  deal: one(dealPipeline, {
    fields: [tasks.deal_id],
    references: [dealPipeline.id],
  }),
  asset: one(assets, {
    fields: [tasks.asset_id],
    references: [assets.id],
  }),
  assignedUser: one(users, {
    fields: [tasks.assigned_to],
    references: [users.id],
  }),
}));

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, {
    fields: [activityLog.user_id],
    references: [users.id],
  }),
  deal: one(dealPipeline, {
    fields: [activityLog.deal_id],
    references: [dealPipeline.id],
  }),
  asset: one(assets, {
    fields: [activityLog.asset_id],
    references: [assets.id],
  }),
}));
