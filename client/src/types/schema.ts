// --- MANUS V2 BACKEND SCHEMA DEFINITIONS ---

export type UserRole = 'admin' | 'viewer' | 'analyst';
export type DealStatus = 'new' | 'contacted' | 'conversation' | 'loi' | 'closed';
export type DealStage = 'discovery' | 'analysis' | 'diligence' | 'closing' | 'integration';
export type AnalysisStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * User Profile (Extended)
 * Matches table: `users`
 */
export interface User {
    id: string; // UUID
    email: string;
    name: string;
    role: UserRole;
    avatar_url?: string;
    team_id?: string;

    // V2 Extensions
    investment_goals?: {
        target_irr: number;
        hold_period: number;
        sector_preferences: string[];
    };
    risk_tolerance?: 'conservative' | 'moderate' | 'aggressive';
    capital_available?: number;
    preferences?: Record<string, any>;
    notification_settings?: Record<string, any>;

    created_at: string;
    updated_at: string;
}

/**
 * Deal Pipeline (Core Entity)
 * Matches table: `deal_pipeline`
 */
export interface Deal {
    id: string; // UUID
    business_name: string;
    description?: string;

    // Financials
    asking_price: number;
    revenue: number;
    profit: number;
    cash_flow: number;
    ebitda?: number;

    // Location
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;

    // Scoring & Intelligence
    composite_score: number; // 0.00 - 1.00
    financial_health_score?: number;
    strategic_fit_score?: number;
    market_opportunity_score?: number;
    risk_score?: number;

    score_components?: {
        financial: number;
        location: number;
        growth: number;
        risk: number;
    };
    ai_scenarios?: {
        optimistic: any;
        base: any;
        pessimistic: any;
    };
    red_flags?: string[];
    opportunities?: string[];

    // AI Analysis Results
    ai_executive_summary?: string;
    ai_financial_analysis?: any;
    ai_strategic_analysis?: any;
    ai_risk_analysis?: any;
    ai_market_pulse?: any;
    confidence_score?: number; // 0-100
    last_analyzed_at?: string;

    // Source Metadata
    source: string; // 'BizBuySell', 'OffMarket', etc.
    source_url?: string;
    source_id?: string;
    scraped_at?: string;

    // Workflow
    status: DealStatus;
    stage: DealStage;
    assigned_to?: string; // User ID

    created_at: string;
    updated_at: string;
}

/**
 * Analysis Run (AI Job Tracking)
 * Matches table: `analysis_runs`
 */
export interface AnalysisRun {
    id: string;
    deal_id: string;

    status: AnalysisStatus;
    trigger_type: 'auto' | 'manual' | 'scheduled';

    // Model Execution Tracking
    models_used?: Record<string, 'pending' | 'completed' | 'failed'>;
    items_processed: number;
    total_items?: number;

    results?: any;
    error_message?: string;

    started_at?: string;
    completed_at?: string;
    created_at: string;
}

/**
 * Market Data (Raw Scraper Cache)
 * Matches table: `market_data`
 */
export interface MarketData {
    id: string;
    source: string;
    source_id?: string;
    source_url?: string;

    raw_data: any;
    normalized_data?: any;

    processed: boolean;
    deal_id?: string;

    scraped_at: string;
    created_at: string;
}

/**
 * Deal Comments
 * Matches table: `deal_comments`
 */
export interface Comment {
    id: string;
    deal_id: string;
    user_id: string;
    content: string;
    mentions?: string[]; // User IDs
    created_at: string;
    updated_at: string;
}

/**
 * Assets (Post-Acquisition)
 * Matches table: `assets`
 */
export interface Asset {
    id: string;
    deal_id: string;

    acquisition_date: string;
    purchase_price: number;
    current_value?: number;

    // Performance Tracking
    kpis?: {
        current_revenue: number;
        current_profit: number;
        occupancy_rate?: number;
        [key: string]: any;
    };

    integration_status: 'planning' | 'in_progress' | 'complete';
    day_100_plan?: {
        phase1: Task[];
        phase2: Task[];
        phase3: Task[];
    };

    created_at: string;
    updated_at: string;
}

/**
 * Financing Scenarios
 * Matches table: `capital_stack_configs`
 */
export interface CapitalStackConfig {
    id: string;
    deal_id: string;
    user_id?: string;

    name?: string; // e.g. 'Conservative'

    // Financing Levers (Percentages)
    equity_percent: number;
    seller_note_percent: number;
    sba_7a_percent: number;
    conventional_loan_percent: number;

    // Outputs
    total_capital_required: number;
    cash_on_cash_return?: number;
    irr?: number;

    created_at: string;
    updated_at: string;
}

/**
 * Performance Projections
 * Matches table: `performance_projections`
 */
export interface PerformanceProjection {
    id: string;
    deal_id: string;

    scenario_type: 'conservative' | 'base' | 'aggressive';

    // 5-Year Arrays
    revenue_projections: number[];
    profit_projections: number[];
    cash_flow_projections: number[];

    assumptions?: Record<string, any>;

    created_at: string;
    updated_at: string;
}

/**
 * Tasks / 100-Day Plan Items
 * Matches table: `tasks`
 */
export interface Task {
    id: string;
    deal_id?: string;
    asset_id?: string;

    assigned_to?: string;

    title: string;
    description?: string;

    // 100-Day Plan Context
    plan_phase?: 'phase1' | 'phase2' | 'phase3';
    day_range?: '1-30' | '31-60' | '61-100';

    due_date?: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';

    completed_at?: string;
    created_at: string;
    updated_at: string;
}

/**
 * Audit Log
 * Matches table: `activity_log`
 */
export interface Activity {
    id: string;
    user_id: string;
    deal_id?: string;
    asset_id?: string;
    action_type: string;
    description: string;
    metadata?: any;
    created_at: string;
}
