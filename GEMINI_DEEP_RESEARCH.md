# Gemini Deep Research Integration Guide

**Objective:** Integrate the `deep-research-pro-preview-12-2025` agent into the application to perform autonomous market analysis and investor research.

## 1. Core API Specifications

*   **Agent Model Name:** `deep-research-pro-preview-12-2025`
*   **Endpoint:** `interactions.create` (Part of the Interactions API, *not* `generate_content`).
*   **Execution Mode:** **MUST** use `background=True`. The agent does not support synchronous calls.
*   **Streaming:** Supported and recommended for UI feedback. Requires `stream=True` AND `background=True`.
*   **Tools:**
    *   Default: `Google Search`, `url_context`.
    *   Optional: `file_search` (allows analyzing uploaded internal documents/fiscal reports).

## 2. Implementation Architecture (React + Backend)

*   **Frontend (React):** Cannot call this API directly (security risk). It must poll a backend endpoint or use a WebSocket/Stream to receive updates.
*   **Backend Process:**
    1.  **Start:** Call `client.interactions.create` with the prompt.
    2.  **Store ID:** Capture the `interaction.id` immediately.
    3.  **Poll/Stream:** Because research takes minutes, you must poll `client.interactions.get(id)` or listen to the stream events to update the UI.

## 3. Reference Implementation (Python SDK)

While the codebase is Node.js, the logic follows this Python reference:

### A. Starting a Research Task (Async/Background)

```python
from google import genai

client = genai.Client()

# Example Prompt for your Investor App
market_prompt = """
Scan the current market for Series B SaaS companies in the fintech sector showing rapid growth.
Format the output as a detailed investment memo including:
1. Executive Summary
2. Key Players (Must include a data table of estimated revenue and funding)
3. Competitive Landscape & Risks
"""

# Initialize the interaction
interaction = client.interactions.create(
    input=market_prompt,
    agent='deep-research-pro-preview-12-2025',
    background=True  # MANDATORY
)

print(f"Task Started. Interaction ID: {interaction.id}")
# Return this ID to the React frontend to begin polling
```

### B. Handling the Stream (Recommended for UX)

To show "Thinking..." steps in your React UI, enable `thinking_summaries`.

```python
stream = client.interactions.create(
    input="Research recent M&A activity in renewable energy.",
    agent='deep-research-pro-preview-12-2025',
    background=True,
    stream=True,
    agent_config={
        "type": "deep-research",
        "thinking_summaries": "auto" # Returns reasoning steps for the UI
    }
)

for chunk in stream:
    if chunk.event_type == "interaction.start":
        print(f"ID: {chunk.interaction.id}")
    elif chunk.delta.type == "thought_summary":
        # Send this to React UI to show "Agent is analyzing X..."
        print(f"Update: {chunk.delta.content.text}")
    elif chunk.delta.type == "text":
        # This is the final report content
        print(chunk.delta.text, end="")
```

## 4. Prompt Engineering for Investor Research

The agent supports "Steerability." You must explicitly define the output structure in the prompt to get usable data for your app.

*   **Bad Prompt:** "Find me deals."
*   **Good Prompt:** "Research the competitive landscape of EV batteries. **Format the output as a technical report with the following structure:** 1. Executive Summary, 2. Key Players (Must include a data table comparing capacity and chemistry), 3. Supply Chain Risks."

## 5. Limitations & Best Practices

*   **Timeouts:** Research can take 10-60 minutes. Ensure your backend timeout settings are high or use a job queue system.
*   **File Context:** If you want to analyze specific pitch decks, use the `file_search` tool (experimental).
*   **Follow-ups:** You can ask questions about the generated report using the `previous_interaction_id` parameter to maintain context.
