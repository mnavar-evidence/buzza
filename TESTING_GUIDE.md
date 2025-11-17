# Buzza ChatGPT App - Testing Guide

**Last Updated:** November 16, 2025
**Version:** 0.1.0 (Demo/Mock API Phase)
**Deployment:** Railway Production

---

## Overview

The Buzza ChatGPT App is now deployed to Railway and ready for team testing. This integration allows users to query restaurant analytics through conversational ChatGPT interactions, receiving rich inline visualizations and actionable insights.

**What's Deployed:**
- ✅ Mock API with demo data for "Buzza Demo Cafe"
- ✅ MCP Server bridging ChatGPT to our analytics APIs
- ✅ 6 functional tools for insights, campaigns, and recommendations
- ✅ Rich inline UI cards and carousels

---

## Prerequisites

### Required:
1. **ChatGPT Access** with Developer Mode enabled
   - If you don't have access, contact OpenAI or request from team lead
   - Developer Mode allows custom tool/connector configuration

2. **Internet Connection**
   - All services are hosted on Railway (no local setup needed)

### Nice to Have:
- Basic familiarity with ChatGPT
- Understanding of restaurant analytics terminology

---

## Production URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **MCP Server (Connector)** | `https://buzza-mcp-server-production.up.railway.app/sse` | ChatGPT connector endpoint |
| **Mock API** | `https://buzza-mock-api-production.up.railway.app` | Backend analytics API |
| **OpenAPI Spec** | `https://buzza-mock-api-production.up.railway.app/chatgpt-openapi.yaml` | API documentation |
| **Health Check** | `https://buzza-mock-api-production.up.railway.app/health` | Service status |

---

## Setup Instructions

### Step 1: Access ChatGPT Developer Mode

1. Open **ChatGPT** (desktop app or web at chatgpt.com)
2. Ensure you have **Developer Mode** enabled
3. Navigate to **Settings** or **Custom Tools**

### Step 2: Create Buzza Connector

1. Click **"Custom Tools"** or **"Connectors"** in the left sidebar
2. Click **"+ New Connector"** or **"Add Custom Tool"**
3. **Configure the connector:**
   - **Name:** `Buzza Production` (or your preference)
   - **URL:** `https://buzza-mcp-server-production.up.railway.app/sse`
   - **Authentication:** None / No Authentication
4. Click **"Connect"** or **"Save"**

### Step 3: Verify Connection

ChatGPT should automatically discover **6 tools**:
- ✅ `insights.get_sales` - Retrieve sales metrics
- ✅ `insights.get_products` - Get product performance
- ✅ `insights.get_trends` - Detect trends and anomalies
- ✅ `campaigns.create_preview` - Draft marketing campaigns
- ✅ `conversation.get_summary` - Get daily highlights
- ✅ `conversation.get_nudges` - Get action recommendations

**Success Indicator:** You should see these tools listed in the connector details or receive a confirmation message.

---

## Test Scenarios

### Scenario 1: Sales Insights ⭐ **START HERE**

**Query:**
```
Show me sales insights for today
```

**Expected Response:**
- Sales metric card with gross sales, net sales, avg ticket
- Period-over-period change percentage
- Actionable flags/recommendations
- Supporting metrics displayed inline

**What to Look For:**
- ✅ Card renders with proper formatting
- ✅ Dollar amounts formatted correctly (e.g., "$2,650.42")
- ✅ Percentage changes show up/down indicators
- ✅ Recommendations are actionable and relevant

---

### Scenario 2: Product Performance

**Query:**
```
What are my best-selling products?
```

**Expected Response:**
- Two inline cards: "Top sellers" and "Items to revive"
- Top products with share of sales percentages
- Underperforming products with decline metrics
- Specific recommendations for each product

**What to Look For:**
- ✅ Product names are clear (e.g., "Vanilla Oat Latte")
- ✅ Percentages and metrics are accurate
- ✅ Recommendations are specific to each product

---

### Scenario 3: Trend Detection

**Query:**
```
Show me trends for the last 30 days
```

**Expected Response:**
- Carousel with multiple trend cards
- Each trend shows: label, severity, direction, insight
- Actionable recommendations

**What to Look For:**
- ✅ Multiple trends displayed
- ✅ Severity levels indicated (watch, opportunity, alert)
- ✅ Clear explanations of what's happening

---

### Scenario 4: Campaign Generation

**Query:**
```
Create a campaign to reactivate inactive customers
```

**Expected Response:**
- Campaign preview card
- Channel (SMS or Email)
- Message draft with tone and offer
- Audience size and recommended send time

**What to Look For:**
- ✅ Message is coherent and on-brand
- ✅ Offer is specific and compelling
- ✅ Timing recommendation makes sense

---

### Scenario 5: Daily Summary

**Query:**
```
Give me today's highlights
```

**Expected Response:**
- Summary cards with key metrics
- Yesterday's performance snapshot
- Quick overview of what's important

**What to Look For:**
- ✅ Concise, scannable information
- ✅ Most relevant insights surfaced first

---

### Scenario 6: Action Nudges

**Query:**
```
What actions should I take today?
```

**Expected Response:**
- Carousel with 3-6 recommended actions
- Each nudge includes: title, description, rationale
- Prioritized by impact

**What to Look For:**
- ✅ Actions are specific and achievable
- ✅ Rationale explains the "why"
- ✅ Clear next steps

---

## Advanced Testing

### Multi-Turn Conversations

**Test Flow:**
1. "Show me sales for today"
2. "How does that compare to yesterday?"
3. "Draft a campaign to boost lunch sales"
4. "Make it more urgent"

**Expected:** ChatGPT should maintain context and provide relevant follow-up responses.

### Time Range Variations

**Queries to Try:**
- "Show me sales for yesterday"
- "What were sales over the last 7 days?"
- "Give me the 30-day trend"

**Expected:** Different timeframes should return appropriately scoped data.

### Error Handling

**Test Invalid Queries:**
- "Show me sales for next year" (future dates)
- "What's the weather?" (off-topic)

**Expected:** Graceful handling with appropriate error messages or clarifications.

---

## Demo Merchant Data

All responses use data for **"Buzza Demo Cafe"** with realistic mock metrics:

| Metric | Sample Values |
|--------|---------------|
| **Today's Gross Sales** | ~$2,650 |
| **30-Day Gross Sales** | ~$18,250 |
| **Average Ticket** | ~$16-18 |
| **Top Product** | Vanilla Oat Latte (18% of sales) |
| **Underperformer** | Sunrise Burrito (22% decline) |

**Note:** Data is deterministic - same queries will return the same results. This is intentional for testing consistency.

---

## Troubleshooting

### Issue: Connector Won't Connect

**Symptoms:** Error message when adding connector
**Solutions:**
1. Verify URL exactly: `https://buzza-mcp-server-production.up.railway.app/sse`
2. Ensure no trailing spaces in URL
3. Select "No Authentication"
4. Check Railway service status: `https://buzza-mock-api-production.up.railway.app/health`

### Issue: No Tools Discovered

**Symptoms:** Connector connects but shows 0 tools
**Solutions:**
1. Disconnect and reconnect the connector
2. Wait 30 seconds and refresh
3. Check Railway logs for MCP server errors
4. Verify environment variable `BUZZA_MOCK_API_URL` is set correctly on Railway

### Issue: 503 Service Unavailable

**Symptoms:** Queries return 503 errors
**Solutions:**
1. Check if Railway services are awake (free tier sleeps after inactivity)
2. Visit health endpoint to wake services: `https://buzza-mock-api-production.up.railway.app/health`
3. Wait 10-15 seconds and retry

### Issue: UI Cards Not Rendering

**Symptoms:** Data returns but no visual cards
**Solutions:**
1. This may be a ChatGPT UI limitation (cards are optional)
2. Verify data is still returned in text format
3. Check browser console for JavaScript errors (if using web)

### Issue: Authentication Error

**Symptoms:** 401 or 403 errors
**Solutions:**
- Current setup requires NO authentication
- If seeing auth errors, Railway environment variables may be misconfigured
- Contact team lead to verify Railway configuration

---

## Reporting Issues

When reporting bugs or issues, please include:

1. **Query Used:** Exact text you sent to ChatGPT
2. **Expected Result:** What you expected to see
3. **Actual Result:** What actually happened (screenshot if possible)
4. **Error Messages:** Any error codes or messages
5. **Timestamp:** When the issue occurred
6. **Environment:** Desktop app vs. web browser

**Submit to:** [Your team's issue tracking system]

---

## Known Limitations

### Current Phase (Demo/Mock):
- ❌ No real merchant data (demo data only)
- ❌ No authentication (public access)
- ❌ No multi-merchant support (single demo merchant)
- ❌ No live Clover integration
- ❌ Data doesn't update in real-time

### Planned for Next Phase:
- ✅ OAuth 2.0 authentication
- ✅ Live Clover merchant data
- ✅ Multi-merchant support
- ✅ Real-time data refresh
- ✅ Historical data queries (custom date ranges)

---

## Success Criteria

Your testing session is successful if you can:

✅ Connect the Buzza connector to ChatGPT
✅ Execute all 6 test scenarios successfully
✅ Receive properly formatted inline cards
✅ Get relevant, actionable recommendations
✅ Maintain context across multi-turn conversations
✅ Understand the data and insights provided

---

## Next Steps After Testing

1. **Provide Feedback:** Share your experience with the team
2. **Suggest Improvements:** What insights would be more valuable?
3. **Identify Use Cases:** How would real merchants use this?
4. **Report Bugs:** Document any issues encountered
5. **Request Features:** What's missing that you'd want to see?

---

## Support & Contact

**Technical Issues:**
Contact: M Navar (mnavar@gmail.com)

**Access Issues:**
Contact: [Team Lead Name]

**Railway Dashboard:**
https://railway.app/project/buzza-app

**GitHub Repository:**
https://github.com/mnavar-evidence/buzza

---

## Quick Reference Card

**Save this for easy access:**

```
🔗 Connector URL:
https://buzza-mcp-server-production.up.railway.app/sse

🔐 Authentication: None

✅ Health Check:
https://buzza-mock-api-production.up.railway.app/health

💬 Test Query: "Show me sales insights for today"
```

---

**Happy Testing! 🚀**

If you encounter any issues or have questions, don't hesitate to reach out to the team.
