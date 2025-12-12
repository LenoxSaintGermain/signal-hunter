export type UserRole = 'admin' | 'analyst' | 'viewer';
export type DealStatus = 'new' | 'contacted' | 'conversation' | 'loi' | 'closed';
export type DealStage = 'discovery' | 'analysis' | 'diligence' | 'closing' | 'integration';
export type ActivityType = 'status_change' | 'comment' | 'upload' | 'task_update';

/**
 * User Profile
 * Corresponds to `auth.users` in Supabase + public profiles table
 */
export interface User {
    id: string; // UUID
    email: string;
    name: string;
    role: UserRole;
    avatar_url?: string;
    team_id?: string;
    preferences?: Record<string, any>;
    notification_settings?: {
        email_digest: boolean;
        real_time_alerts: boolean;
    };
    created_at: string;
}

/**
 * Deal / Opportunity
 * The core entity for the pipeline
 */
export interface Deal {
    id: string; // UUID
    business_name: string;
    description?: string;

    // Financials
    asking_price?: number;
    revenue?: number;
    profit?: number;
    cash_flow?: number;

    // Scoring & Intelligence
    composite_score: number; // 0.0 - 1.0
    score_components?: {
        financial: number;
        location: number;
        growth: number;
        risk: number;
    };
    ai_scenarios?: {
        optimistic: Record<string, any>;
        pessimistic: Record<string, any>;
    };
    red_flags?: string[];

    // Metadata
    source: string; // e.g. "BizBuySell", "OffMarket"
    source_url?: string;
    scraped_at?: string;

    // Workflow
    status: DealStatus;
    stage: DealStage;
    assigned_to?: string; // User ID

    created_at: string;
    updated_at: string;
}

/**
 * Deal Comments / Discussion Thread
 */
export interface Comment {
    id: string; // UUID
    deal_id: string;
    user_id: string;
    content: string;
    mentions?: string[]; // Array of User IDs
    created_at: string;
    updated_at?: string;
}

/**
 * Documents / Data Room
 */
export interface Document {
    id: string; // UUID
    deal_id: string;
    asset_id?: string; // If associated with an acquired asset
    filename: string;
    file_url: string;
    file_type: string; // MIME type or extension
    uploaded_by: string; // User ID
    version: number;
    created_at: string;
}

/**
 * Tasks / Action Items
 */
export interface Task {
    id: string; // UUID
    deal_id: string;
    assigned_to: string; // User ID
    title: string;
    description?: string;
    due_date?: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    completed_at?: string;
}

/**
 * Assets (Post-Acquisition)
 */
export interface Asset {
    id: string; // UUID
    deal_id: string;
    acquisition_date: string;
    purchase_price: number;
    current_value?: number;

    // Performance Tracking
    kpis?: {
        current_revenue: number;
        current_profit: number;
        occupancy_rate?: number;
        [key: string]: number | undefined;
    };

    integration_status: 'planning' | 'in_progress' | 'complete';
    created_at: string;
    updated_at: string;
}

/**
 * Activity Feed / Audit Log
 */
export interface Activity {
    id: string; // UUID
    user_id: string;
    deal_id?: string;
    asset_id?: string;
    action_type: ActivityType;
    description: string;
    metadata?: Record<string, any>;
    created_at: string;
}
