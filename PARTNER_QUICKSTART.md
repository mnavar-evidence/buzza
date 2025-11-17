# Buzza ChatGPT App - Partner Quick Start

**Get started in 5 minutes** ⏱️

---

## What You'll Get

Ask ChatGPT natural language questions about restaurant performance and get:
- 📊 Real-time sales insights
- 🍽️ Product performance analytics
- 📈 Trend detection and alerts
- 📱 AI-generated marketing campaigns
- 💡 Actionable recommendations

---

## Setup (3 Steps)

### 1. Prerequisites
- ChatGPT account with **Developer Mode** enabled
- Internet connection

### 2. Add Buzza Connector
1. Open **ChatGPT** → **Settings** → **Custom Tools**
2. Click **"+ New Connector"**
3. Paste this URL:
   ```
   https://buzza-mcp-server-production.up.railway.app/sse
   ```
4. **Authentication:** None
5. Click **"Connect"**

### 3. Test It!
Ask ChatGPT:
```
Show me sales insights for today
```

✅ You should see a formatted card with sales metrics, trends, and recommendations.

---

## Try These Queries

**Sales & Performance:**
- "What were my sales yesterday?"
- "Show me the last 7 days of sales"
- "What's my average ticket size?"

**Product Insights:**
- "What are my best-selling products?"
- "Which items are underperforming?"
- "Show me product trends"

**Marketing:**
- "Create a campaign to reactivate customers"
- "Draft an SMS for my lunch rush"
- "Help me promote my top seller"

**Smart Recommendations:**
- "What should I focus on today?"
- "Give me actionable insights"
- "Show me opportunities to increase revenue"

---

## What's Working Now

✅ 6 AI-powered analytics tools
✅ Beautiful inline visualizations
✅ Conversational interface
✅ Demo data for testing (Buzza Demo Cafe)

---

## What's Coming Next

🔜 Live Clover merchant data
🔜 Multi-location support
🔜 Custom date ranges
🔜 Historical comparisons
🔜 OAuth authentication

---

## Demo Merchant Data

Currently showing data for **"Buzza Demo Cafe"** with realistic metrics:
- Daily sales: ~$2,600
- Top product: Vanilla Oat Latte (18% of sales)
- Average ticket: ~$17

This is intentional for consistent testing across all partners.

---

## Need Help?

**Can't connect?**
- Verify the URL is exactly: `https://buzza-mcp-server-production.up.railway.app/sse`
- Make sure "No Authentication" is selected
- Try disconnecting and reconnecting

**No data showing?**
- Wait 10 seconds (services may be waking up)
- Try: "Show me sales for today"
- Check service status: https://buzza-mock-api-production.up.railway.app/health

**Want more details?**
See the full [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## Contact

**Questions or Feedback:**
Email: mnavar@gmail.com

**Found a bug?**
Report it to your point of contact

---

## Quick Reference

| What | Value |
|------|-------|
| **Connector URL** | `https://buzza-mcp-server-production.up.railway.app/sse` |
| **Authentication** | None |
| **Test Query** | "Show me sales insights for today" |
| **Health Check** | https://buzza-mock-api-production.up.railway.app/health |

---

**Ready to transform restaurant analytics with AI? Let's go! 🚀**
