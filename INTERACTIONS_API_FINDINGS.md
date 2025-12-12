# Interactions API Research Findings

## Critical Updates Needed for Our DeepResearchService

Based on the official Google blog post and documentation, here are the key improvements needed:

### 1. **Background Execution Mode** (`background=True`)
**Current Issue**: Our `DeepResearchService` doesn't use background mode
**Impact**: Browser timeouts, blocking requests
**Solution**: Set `background=true` in the API call

```typescript
// CURRENT (blocking):
const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    agent: 'deep-research-pro-preview-12-2025',
    input: prompt
  })
});

// SHOULD BE (non-blocking):
const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    agent: 'deep-research-pro-preview-12-2025',
    input: prompt,
    background: true  // ← ADD THIS
  })
});
```

### 2. **Thought Streaming** for Live Status Updates
**Current Issue**: No visibility into agent's reasoning process
**Impact**: Users see nothing for 2-5 minutes
**Solution**: Stream "thoughts" to show progress

```typescript
// Enable streaming to get thoughts
const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    agent: 'deep-research-pro-preview-12-2025',
    input: prompt,
    background: true,
    stream: true  // ← ADD THIS for thought streaming
  })
});

// Parse Server-Sent Events (SSE)
for await (const chunk of stream) {
  if (chunk.event_type === 'content.delta') {
    if (chunk.delta.type === 'thought') {
      // Send to UI: "Searching for Series B SaaS companies..."
      console.log(chunk.delta.thought);
    }
  }
}
```

### 3. **Interaction ID Polling** (Already Implemented ✅)
**Current Status**: We already poll with `interactionId`
**No changes needed** - our polling logic is correct

### 4. **Previous Interaction Tracking** for Follow-ups
**Current Issue**: Not using `previous_interaction_id` for conversation continuity
**Impact**: Can't ask follow-up questions about previous scans
**Solution**: Store interaction IDs and chain them

```typescript
// First scan
const scan1 = await client.interactions.create({
  agent: 'deep-research-pro-preview-12-2025',
  input: 'Find SaaS companies in Georgia',
  background: true
});

// Follow-up scan (reuses context)
const scan2 = await client.interactions.create({
  agent: 'deep-research-pro-preview-12-2025',
  input: 'Now filter for revenue > $5M',
  previous_interaction_id: scan1.id,  // ← ADD THIS
  background: true
});
```

### 5. **Use Official SDK Instead of Raw Fetch**
**Current Issue**: We're using raw `fetch` calls
**Impact**: Missing automatic retries, error handling, type safety
**Solution**: Use `google-genai` SDK (already installed!)

```typescript
// CURRENT (raw fetch):
const response = await fetch(url, {
  method: 'POST',
  headers: { 'x-goog-api-key': apiKey },
  body: JSON.stringify({ agent, input })
});

// SHOULD BE (official SDK):
import { GoogleGenAI } from '@google/genai';
const client = new GoogleGenAI({ apiKey });

const interaction = await client.interactions.create({
  agent: 'deep-research-pro-preview-12-2025',
  input: prompt,
  background: true,
  stream: true
});
```

---

## Implementation Priority

1. **HIGH PRIORITY**: Add `background=true` (prevents timeouts)
2. **HIGH PRIORITY**: Switch to official SDK (better error handling)
3. **MEDIUM PRIORITY**: Add thought streaming (better UX)
4. **LOW PRIORITY**: Add `previous_interaction_id` (nice-to-have for follow-ups)

---

## Updated Architecture

```
┌─────────────────┐
│  React Frontend │
│  SearchSettings │
└────────┬────────┘
         │ 1. User clicks "Start Scan"
         ▼
┌─────────────────────────┐
│  tRPC: market.scan      │
│  Triggers Deep Research │
└────────┬────────────────┘
         │ 2. Call Interactions API with background=true
         ▼
┌──────────────────────────────┐
│  Gemini Deep Research Agent  │
│  (2-5 minutes, async)        │
└────────┬─────────────────────┘
         │ 3. Returns interaction_id immediately
         ▼
┌─────────────────────────┐
│  Frontend Polls Status  │
│  Every 10 seconds       │
└────────┬────────────────┘
         │ 4. Poll: GET /interactions/{id}
         ▼
┌──────────────────────────────┐
│  Status: in_progress         │
│  Thoughts: "Searching..."    │ ← NEW: Show live thoughts
└────────┬─────────────────────┘
         │ 5. Status: completed
         ▼
┌──────────────────────────────┐
│  Parse JSON output           │
│  Insert deals into database  │
└──────────────────────────────┘
```

---

## Code Changes Needed

### File: `server/services/deepResearch.ts`

**Change 1**: Add `background=true` to API call
**Change 2**: Switch from `fetch` to official SDK
**Change 3**: Add thought streaming support
**Change 4**: Store `interaction_id` for follow-ups

### File: `client/src/pages/SearchSettings.tsx`

**Change 1**: Add live status display for thoughts
**Change 2**: Update polling UI to show progress
**Change 3**: Add "Follow-up Scan" button (uses `previous_interaction_id`)

---

## Testing Plan

1. ✅ Test background execution (no browser timeout)
2. ✅ Test thought streaming (see live progress)
3. ✅ Test polling (status updates every 10s)
4. ✅ Test follow-up scans (conversation continuity)
5. ✅ Test error handling (failed scans, API errors)

---

## References

- Blog Post: https://developers.googleblog.com/building-agents-with-the-adk-and-the-new-interactions-api/
- Official Docs: https://ai.google.dev/gemini-api/docs/interactions
- Deep Research Guide: https://ai.google.dev/gemini-api/docs/deep-research
