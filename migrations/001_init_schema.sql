-- Million Hunter V2 Database Schema
-- Phase 1: Core Tables for Business Acquisition Platform

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'viewer',
  avatar_url TEXT,
  team_id UUID,
  
  -- V2 Extensions
  investment_goals JSONB,
  risk_tolerance VARCHAR(50),
  capital_available NUMERIC(15, 2),
  preferences JSONB,
  notification_settings JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users(email);

-- ==================== DEAL PIPELINE TABLE ====================
CREATE TABLE IF NOT EXISTS deal_pipeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(500) NOT NULL,
  description TEXT,
  
  -- Financials
  asking_price NUMERIC(15, 2),
  revenue NUMERIC(15, 2),
  profit NUMERIC(15, 2),
  cash_flow NUMERIC(15, 2),
  ebitda NUMERIC(15, 2),
  
  -- Location
  city VARCHAR(255),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'USA',
  lat NUMERIC(10, 8),
  lng NUMERIC(11, 8),
  
  -- Scoring & Intelligence
  composite_score NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
  financial_health_score NUMERIC(3, 2),
  strategic_fit_score NUMERIC(3, 2),
  market_opportunity_score NUMERIC(3, 2),
  risk_score NUMERIC(3, 2),
  
  score_components JSONB,
  ai_scenarios JSONB,
  red_flags JSONB,
  opportunities JSONB,
  
  -- AI Analysis Results
  ai_executive_summary TEXT,
  ai_financial_analysis JSONB,
  ai_strategic_analysis JSONB,
  ai_risk_analysis JSONB,
  ai_market_pulse JSONB,
  confidence_score INTEGER,
  last_analyzed_at TIMESTAMP,
  
  -- Source Metadata
  source VARCHAR(255) NOT NULL,
  source_url TEXT,
  source_id VARCHAR(255),
  scraped_at TIMESTAMP,
  
  -- Workflow
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  stage VARCHAR(50) NOT NULL DEFAULT 'discovery',
  assigned_to UUID REFERENCES users(id),
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS deal_composite_score_idx ON deal_pipeline(composite_score);
CREATE INDEX IF NOT EXISTS deal_status_idx ON deal_pipeline(status);
CREATE INDEX IF NOT EXISTS deal_stage_idx ON deal_pipeline(stage);
CREATE INDEX IF NOT EXISTS deal_source_idx ON deal_pipeline(source);
CREATE UNIQUE INDEX IF NOT EXISTS deal_source_unique_idx ON deal_pipeline(source, source_id);

-- ==================== ANALYSIS RUNS TABLE ====================
CREATE TABLE IF NOT EXISTS analysis_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  trigger_type VARCHAR(50),
  
  -- Model Execution Tracking
  models_used JSONB,
  items_processed INTEGER NOT NULL DEFAULT 0,
  total_items INTEGER,
  
  -- Results
  results JSONB,
  error_message TEXT,
  
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS analysis_deal_idx ON analysis_runs(deal_id);
CREATE INDEX IF NOT EXISTS analysis_status_idx ON analysis_runs(status);

-- ==================== MARKET DATA TABLE ====================
CREATE TABLE IF NOT EXISTS market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(255) NOT NULL,
  source_id VARCHAR(255),
  source_url TEXT,
  
  raw_data JSONB NOT NULL,
  normalized_data JSONB,
  
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  deal_id UUID REFERENCES deal_pipeline(id),
  
  scraped_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS market_source_idx ON market_data(source);
CREATE INDEX IF NOT EXISTS market_processed_idx ON market_data(processed);
CREATE UNIQUE INDEX IF NOT EXISTS market_source_unique_idx ON market_data(source, source_id);

-- ==================== DEAL COMMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS deal_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  
  content TEXT NOT NULL,
  mentions JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comment_deal_idx ON deal_comments(deal_id);
CREATE INDEX IF NOT EXISTS comment_user_idx ON deal_comments(user_id);

-- ==================== ASSETS TABLE ====================
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deal_pipeline(id),
  
  acquisition_date DATE NOT NULL,
  purchase_price NUMERIC(15, 2) NOT NULL,
  current_value NUMERIC(15, 2),
  
  -- Performance Tracking
  kpis JSONB,
  
  -- 100-Day Plan
  integration_status VARCHAR(50) NOT NULL DEFAULT 'planning',
  day_100_plan JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS asset_deal_idx ON assets(deal_id);
CREATE INDEX IF NOT EXISTS asset_status_idx ON assets(integration_status);

-- ==================== CAPITAL STACK CONFIGS TABLE ====================
CREATE TABLE IF NOT EXISTS capital_stack_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  
  name VARCHAR(255),
  
  -- Financing Levers (Percentages)
  equity_percent NUMERIC(5, 2) NOT NULL,
  seller_note_percent NUMERIC(5, 2) NOT NULL,
  sba_7a_percent NUMERIC(5, 2) NOT NULL,
  conventional_loan_percent NUMERIC(5, 2) NOT NULL,
  
  -- Calculated Outputs
  total_capital_required NUMERIC(15, 2) NOT NULL,
  cash_on_cash_return NUMERIC(5, 2),
  irr NUMERIC(5, 2),
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capital_deal_idx ON capital_stack_configs(deal_id);

-- ==================== PERFORMANCE PROJECTIONS TABLE ====================
CREATE TABLE IF NOT EXISTS performance_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  
  scenario_type VARCHAR(50) NOT NULL,
  
  -- 5-Year Projections (Arrays stored as JSONB)
  revenue_projections JSONB NOT NULL,
  profit_projections JSONB NOT NULL,
  cash_flow_projections JSONB NOT NULL,
  
  assumptions JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS projection_deal_idx ON performance_projections(deal_id);

-- ==================== TASKS TABLE ====================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  
  assigned_to UUID REFERENCES users(id),
  
  title VARCHAR(500) NOT NULL,
  description TEXT,
  
  -- 100-Day Plan Integration
  plan_phase VARCHAR(50),
  day_range VARCHAR(50),
  
  due_date DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  priority VARCHAR(50) NOT NULL DEFAULT 'medium',
  
  completed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS task_deal_idx ON tasks(deal_id);
CREATE INDEX IF NOT EXISTS task_asset_idx ON tasks(asset_id);
CREATE INDEX IF NOT EXISTS task_assigned_idx ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS task_status_idx ON tasks(status);

-- ==================== ACTIVITY LOG TABLE ====================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  deal_id UUID REFERENCES deal_pipeline(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  
  action_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS activity_user_idx ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS activity_deal_idx ON activity_log(deal_id);
CREATE INDEX IF NOT EXISTS activity_type_idx ON activity_log(action_type);
CREATE INDEX IF NOT EXISTS activity_created_idx ON activity_log(created_at);
