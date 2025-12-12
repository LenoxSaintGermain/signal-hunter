import { getDb } from "../db";

/**
 * Service for interacting with Gemini Deep Research Agent
 * Endpoint: interactions.create (Preview)
 */
export class DeepResearchService {
    private apiKey: string;
    private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY || "";
        if (!this.apiKey) {
            console.warn("GEMINI_API_KEY not set for DeepResearchService");
        }
    }

    /**
     * Start a background research task
     * Agent: deep-research-pro-preview-12-2025
     */
    async startResearch(prompt: string): Promise<{ id: string; status: string }> {
        console.log("[DeepResearch] Starting task for prompt:", prompt.substring(0, 50) + "...");

        // Construct request for interactions.create
        // Note: Using fetch because standard SDK might not cover 'interactions' preview yet
        const url = `${this.baseUrl}/interactions?key=${this.apiKey}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    input: prompt,
                    agent: "deep-research-pro-preview-12-2025",
                    background: true, // Mandatory for this agent
                    stream: false // Using polling for simplicity in V1
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[DeepResearch] API Error (${response.status}):`, errorText);
                throw new Error(`Gemini API Error: ${errorText}`);
            }

            const data = await response.json();

            // Expecting { name: "interactions/...", ... } or similar resource object
            // The Python example returns an object with .id
            // We'll map the response assuming standard Google Operation or Resource format
            // Adjust based on actual API response behavior if needed
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
     */
    async getResearchStatus(interactionId: string): Promise<{
        status: "running" | "completed" | "failed";
        result?: string;
        logs?: string[];
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

            // Check status field from API
            // Typical Google LRO (Long Running Operation) might use "done": true
            // Or specific interaction status field
            const isDone = data.done || data.state === "SUCCEEDED" || data.state === "COMPLETED";

            if (isDone) {
                // Extract final output
                // Adjust path based on actual response schema for 'interactions'
                const output = data.response?.output || data.output?.text || JSON.stringify(data);
                return { status: "completed", result: output };
            }

            if (data.error || data.state === "FAILED") {
                return { status: "failed", result: JSON.stringify(data.error) };
            }

            // Still running
            // Optionally extract partial logs/thoughts if available
            return { status: "running" };

        } catch (error) {
            console.error("[DeepResearch] Status check failed:", error);
            // Don't fail the whole flow on temporary network error
            return { status: "running" };
        }
    }
}

export const deepResearchService = new DeepResearchService();
