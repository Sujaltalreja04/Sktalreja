# Chatbot Testing Guide

## How to Test the Optimizations

### 1. Test Short Responses ✅
**Action**: Ask: "What are Sujal's main AI projects?"
**Expected**: Short, 2-3 sentence response listing InfraSentinel and Evolvex AI

### 2. Test Portfolio-Only Filter ✅
Try these off-topic questions:

**Question**: "What is the capital of France?"
**Expected**: "I can only answer questions about Sujal's portfolio. Ask me about his projects, skills, or achievements!"

**Question**: "Help me code a Python function"
**Expected**: Redirection to portfolio topics

**Question**: "Who is the president?"
**Expected**: Redirection to portfolio topics

### 3. Test Rate Limiting ✅
**Action**: Ask 10 questions quickly
**Expected**:
- After 7 requests: Yellow warning banner appears showing "3 requests remaining this hour"
- After 10 requests: Error message "⚠️ You've reached the hourly limit (10 requests). Please try again later to prevent excessive API costs."
- Input field becomes disabled
- Suggested question buttons become disabled

### 4. Test Rate Limit Reset ✅
**Action**: 
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find key: `chatbot_rate_limit`
4. Delete it or wait 1 hour
**Expected**: Counter resets to 10 requests

### 5. Test Valid Portfolio Questions ✅
Try these (should work normally):
- "Tell me about InfraSentinel"
- "What skills does Sujal have?"
- "Show me his achievements"
- "How can I contact Sujal?"
- "What is Evolvex AI?"

## Quick Reset for Testing
To reset rate limit manually:
1. Open DevTools (F12)
2. Console tab
3. Run: `localStorage.removeItem('chatbot_rate_limit')`
4. Refresh page

## Visual Indicators

### Rate Limit Warning (≤3 requests left)
```
⚠️ 3 requests remaining this hour
```
- Yellow banner below header
- Warning triangle icon

### Rate Limit Reached (0 requests)
```
⚠️ You've reached the hourly limit (10 requests). 
Please try again later to prevent excessive API costs.
```
- Message appears as assistant response
- Input placeholder changes to "Rate limit reached..."
- Send button disabled

## Troubleshooting

### If rate limit doesn't work:
1. Check browser supports localStorage
2. Check console for errors
3. Verify DevTools > Application > Local Storage has `chatbot_rate_limit` key

### If responses are still long:
1. Check `.env` file has correct VITE_GROQ_API_KEY
2. Verify API is responding (check Network tab)
3. Response length is controlled by `max_tokens: 150`

### If off-topic questions work:
1. The system prompt has strict rules
2. AI might still answer if question is borderline
3. Report specific examples for further refinement

## Success Metrics
✅ Responses are 2-3 sentences max  
✅ Off-topic questions get rejected  
✅ Rate limit enforces 10 requests/hour  
✅ Warning appears at 3 requests remaining  
✅ Input disabled when limit reached  
✅ Auto-reset after 1 hour  
✅ Build completes without errors
