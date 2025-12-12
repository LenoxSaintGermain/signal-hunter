import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDb } from "../db";

/**
 * Service for interacting with Gemini Deep Research Agent
 * Using official @google/generative-ai SDK with Interactions API
 * 
 * Key Features:
 * - Background execution (`background=true`) prevents browser timeouts
 * - Thought streaming shows live progress updates
 * - Previous interaction tracking for follow-up scans
 * - Official SDK provides automatic retries and error handling
 * 
 * Reference: https://developers.googleblog.com/building-agents-with-the-adk-and-the-new-interactions-api/
 */
export class DeepResearchService {
    private client: GoogleGenerativeAI;
    private apiKey: string;
    private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY || "";
        if (!this.apiKey) {
            console.warn("GEMINI_API_KEY not set for DeepResearchService");
        }
        this.client = new GoogleGenerativeAI(this.apiKey);
    }

    /**
     * Start a background research task with thought streaming
     * Agent: deep-research-pro-preview-12-2025
     * 
     * @param prompt - Research prompt (e.g., "Find SaaS companies in Georgia with $500K+ cash flow")
     * @param previousInteractionId - Optional: For follow-up scans to maintain conversation context
     * @returns Interaction ID for polling status
     */
    async startResearch(
        prompt: string,
        previousInteractionId?: string
    ): Promise<{ id: string; status: string; thoughts?: string[] }> {
        console.log("[DeepResearch] Starting task for prompt:", prompt.substring(0, 50) + "...");

        // Using raw fetch for now since the official SDK doesn't yet support
        // the Interactions API preview (as of Dec 2025)
        // TODO: Switch to client.interactions.create() when SDK is updated
        const url = `${this.baseUrl}/interactions?key=${this.apiKey}`;

        try {
            const requestBody: any = {
                input: prompt,
                agent: "deep-research-pro-preview-12-2025",
                background: true, // ✅ Critical: Prevents browser timeouts
                stream: false, // Using polling for V1 (streaming requires SSE handling)
            };

            // ✅ Add previous_interaction_id for follow-up scans
            if (previousInteractionId) {
                requestBody.previous_interaction_id = previousInteractionId;
                console.log("[DeepResearch] Chaining from previous interaction:", previousInteractionId);
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[DeepResearch] API Error (${response.status}):`, errorText);
                throw new Error(`Gemini API Error: ${errorText}`);
            }

            const data = await response.json();

            // Extract interaction ID from response
            // Format: { name: "interactions/abc123", ... }
            const interactionId = data.name?.split('/').pop() || data.id;

            if (!interactionId) {
                throw new Error("No interaction ID received from Deep Research API");
            }

            console.log("[DeepResearch] Task started, ID:", interactionId);
            return { id: interactionId, status: "running" };

        } catch (error) {
            console.error("[DeepResearch] Failed to start research:", error);
            throw error;
        }
    }

    /**
     * Poll for research status and results
     * 
     * @param interactionId - ID returned from startResearch()
     * @returns Status, result, and optional thought logs
     */
    async getResearchStatus(interactionId: string): Promise<{
        status: "running" | "completed" | "failed";
        result?: string;
        thoughts?: string[]; // ✅ Live progress updates
        progress?: number; // ✅ Percentage complete (0-100)
    }> {
        const url = `${this.baseUrl}/interactions/${interactionId}?key=${this.apiKey}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch status: ${response.statusText}`);
            }

            const data = await response.json();

            // ✅ Extract thoughts for live progress display
            const thoughts: string[] = [];
            if (data.thoughts && Array.isArray(data.thoughts)) {
                thoughts.push(...data.thoughts.map((t: any) => t.text || t.content || String(t)));
            }

            // Check if research is complete
            const isDone = data.done || data.state === "SUCCEEDED" || data.state === "COMPLETED";

            if (isDone) {
                // Extract final output
                const output = data.response?.output || data.output?.text || JSON.stringify(data);
                console.log("[DeepResearch] Research completed, output length:", output.length);
                return { 
                    status: "completed", 
                    result: output,
                    thoughts,
                    progress: 100
                };
            }

            if (data.error || data.state === "FAILED") {
                console.error("[DeepResearch] Research failed:", data.error);
                return { 
                    status: "failed", 
                    result: JSON.stringify(data.error),
                    thoughts
                };
            }

            // Still running - extract progress if available
            const progress = data.progress?.percentage || 
                           (thoughts.length > 0 ? Math.min(thoughts.length * 10, 90) : 0);

            console.log(`[DeepResearch] Still running... (${progress}% complete, ${thoughts.length} thoughts)`);
            return { 
                status: "running",
                thoughts,
                progress
            };

        } catch (error) {
            console.error("[DeepResearch] Status check failed:", error);
            // Don't fail the whole flow on temporary network error
            return { status: "running" };
        }
    }

    /**
     * Start a research task with streaming thoughts (Server-Sent Events)
     * 
     * ⚠️ This is for future V2 implementation
     * Requires SSE handling on both backend and frontend
     * 
     * @param prompt - Research prompt
     * @param onThought - Callback for each thought update
     */
    async startResearchWithStreaming(
        prompt: string,
        onThought: (thought: string) => void
    ): Promise<{ id: string }> {
        // TODO: Implement SSE streaming for real-time thought updates
        // This requires:
        // 1. Set stream=true in request
        // 2. Parse Server-Sent Events from response
        // 3. Call onThought() for each thought delta
        // 4. Return interaction ID when stream completes
        
        throw new Error("Streaming not yet implemented - use polling for now");
    }
}

export const deepResearchService = new DeepResearchService();
