# Chart Implementation Request - Buzza ChatGPT App

**To:** Developer
**From:** M Navar
**Priority:** Medium
**Estimated Time:** 4-6 hours

---

## What We Have Now

The Buzza ChatGPT integration is **live and working**. Users can ask questions like "Give me sales for last week" and get:

✅ **Visual cards** with titles and CTAs (see screenshot)
✅ **Formatted metrics** (gross sales, net sales, avg ticket)
✅ **Text insights** (trends, opportunities)

**The Problem:** Where you see the "—" placeholder in the card, we want **actual charts/graphs**.

---

## What We Need

Add **simple chart visualizations** to 6 different query types. Charts should be:
- Auto-generated from the data we already return
- Embedded as images (PNG/JPG)
- Readable at ~500-600px wide

---

## The 6 Chart Types Needed

### 1. **Sales Insights** → Line Chart
**Query:** "Show me sales for last week"

**Chart:**
- X-axis: Days (Mon, Tue, Wed...)
- Y-axis: Sales amount ($)
- Single line showing trend
- Add a comparison line for previous week (dotted/gray)

**Mock Data Pattern:**
```javascript
// Generate 7 days of sales data
const salesData = [
  { day: 'Mon', amount: 2100 },
  { day: 'Tue', amount: 1850 },
  { day: 'Wed', amount: 2300 },
  { day: 'Thu', amount: 2450 },
  { day: 'Fri', amount: 2800 },
  { day: 'Sat', amount: 3200 },
  { day: 'Sun', amount: 2900 }
]
```

---

### 2. **Product Performance** → Horizontal Bar Chart
**Query:** "What are my best-selling products?"

**Chart:**
- Horizontal bars showing top 5 products
- Length = percentage of total sales
- Color-code: Green for winners, Red for underperformers

**Mock Data:**
```javascript
const products = [
  { name: 'Vanilla Oat Latte', percentage: 18, status: 'winner' },
  { name: 'Nitro Cold Brew', percentage: 14, status: 'winner' },
  { name: 'Cappuccino', percentage: 12, status: 'neutral' },
  { name: 'Sunrise Burrito', percentage: 4, status: 'underperformer' }
]
```

---

### 3. **Trend Detection** → Multi-Line Chart
**Query:** "Show me trends for the last 30 days"

**Chart:**
- 2-3 lines: Sales, Traffic, Avg Ticket
- X-axis: Days (last 30)
- Mark anomalies with dots/annotations

**Mock Data:**
```javascript
// Generate 30 days, 3 metrics
const trends = {
  labels: ['Day 1', 'Day 2', ..., 'Day 30'],
  sales: [2100, 2200, ...],
  traffic: [120, 135, ...],
  avgTicket: [17.5, 16.3, ...]
}
```

---

### 4. **Campaign Preview** → Pie Chart
**Query:** "Create a campaign to reactivate customers"

**Chart:**
- Audience breakdown by segment
- Example: Loyal (30%), Regular (50%), At Risk (20%)

**Mock Data:**
```javascript
const audience = [
  { segment: 'Loyal', percentage: 30, count: 103 },
  { segment: 'Regular', percentage: 50, count: 171 },
  { segment: 'At Risk', percentage: 20, count: 68 }
]
```

---

### 5. **Daily Summary** → Sparklines
**Query:** "Give me today's highlights"

**Chart:**
- Mini line charts (sparklines) next to each metric
- Show last 7 days trend in compact form

**Mock Data:**
```javascript
const metrics = [
  { label: 'Sales', value: 2845, trend: [2100, 2300, 2450, 2600, 2845] },
  { label: 'Orders', value: 167, trend: [170, 165, 172, 169, 167] }
]
```

---

### 6. **Action Nudges** → Impact Matrix
**Query:** "What should I focus on today?"

**Chart:**
- 2x2 matrix: Impact (Y-axis) vs Effort (X-axis)
- Plot actions as bubbles
- Size = expected revenue lift

**Mock Data:**
```javascript
const actions = [
  { title: 'Reactivate customers', impact: 8, effort: 2, lift: 1200 },
  { title: 'Launch loyalty', impact: 9, effort: 8, lift: 3500 },
  { title: 'Menu refresh', impact: 6, effort: 5, lift: 800 }
]
```

---

## Recommended Implementation

### Use QuickChart.io (Easiest)

**Why:** Free API, generates Chart.js images, no setup needed.

**Example:**
```javascript
const QuickChart = require('quickchart-js');

async function generateSalesChart(salesData) {
  const chart = new QuickChart();
  chart.setConfig({
    type: 'line',
    data: {
      labels: salesData.map(d => d.day),
      datasets: [{
        label: 'Sales',
        data: salesData.map(d => d.amount),
        borderColor: 'rgb(75, 192, 192)'
      }]
    }
  });

  chart.setWidth(600);
  chart.setHeight(300);

  return await chart.getShortUrl();
}

// Returns: "https://quickchart.io/chart?c=..."
```

---

## Where to Add This

**Repository:** https://github.com/mnavar-evidence/buzza

**Files to modify:**
```
mock-api/
├── package.json              # Add: "quickchart-js": "^4.0.0"
├── src/
│   ├── utils/
│   │   └── chartGenerator.js # NEW - Create this file
│   └── routes/
│       ├── insights.js       # UPDATE - Add chart URLs
│       ├── campaigns.js      # UPDATE - Add chart URLs
│       └── conversation.js   # UPDATE - Add chart URLs
```

---

## Step-by-Step

### 1. Install QuickChart
```bash
cd mock-api
npm install quickchart-js
```

### 2. Create Chart Generator
Create `mock-api/src/utils/chartGenerator.js`:
```javascript
const QuickChart = require('quickchart-js');

// Sales line chart
async function generateSalesChart(data) {
  const chart = new QuickChart();
  chart.setConfig({
    type: 'line',
    data: {
      labels: data.map(d => d.day),
      datasets: [{
        label: 'Sales',
        data: data.map(d => d.amount),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)'
      }]
    },
    options: {
      title: { display: true, text: 'Sales Trend' },
      scales: {
        y: {
          ticks: { callback: (val) => '$' + val }
        }
      }
    }
  });
  chart.setWidth(600).setHeight(300);
  return await chart.getShortUrl();
}

// Product bar chart
async function generateProductChart(products) {
  const chart = new QuickChart();
  chart.setConfig({
    type: 'horizontalBar',
    data: {
      labels: products.map(p => p.name),
      datasets: [{
        label: 'Share of Sales',
        data: products.map(p => p.percentage),
        backgroundColor: products.map(p =>
          p.status === 'winner' ? '#4CAF50' :
          p.status === 'underperformer' ? '#F44336' : '#2196F3'
        )
      }]
    },
    options: {
      title: { display: true, text: 'Product Performance' },
      scales: {
        x: { ticks: { callback: (val) => val + '%' } }
      }
    }
  });
  chart.setWidth(600).setHeight(400);
  return await chart.getShortUrl();
}

module.exports = {
  generateSalesChart,
  generateProductChart
  // Add others as needed
};
```

### 3. Update API Routes
In `mock-api/src/routes/insights.js`:
```javascript
const { generateSalesChart } = require('../utils/chartGenerator');

router.get('/sales', async (req, res) => {
  const { timeframe = 'seven_days' } = req.query;

  // Existing logic to get data
  const salesData = getSalesInsights(timeframe);

  // NEW: Generate mock time-series for chart
  const chartData = [
    { day: 'Mon', amount: 2100 },
    { day: 'Tue', amount: 1850 },
    { day: 'Wed', amount: 2300 },
    { day: 'Thu', amount: 2450 },
    { day: 'Fri', amount: 2800 },
    { day: 'Sat', amount: 3200 },
    { day: 'Sun', amount: 2900 }
  ];

  // NEW: Generate chart URL
  const chartUrl = await generateSalesChart(chartData);

  // Add chart to response
  res.json({
    ...salesData,
    chart_url: chartUrl  // ChatGPT will display this
  });
});
```

### 4. Test Locally
```bash
cd mock-api
npm start

# In another terminal:
curl "http://localhost:4000/insights/sales?timeframe=seven_days"
```

You should see `chart_url` in the response.

### 5. Deploy to Railway
```bash
git add .
git commit -m "Add chart generation to all endpoints"
git push origin main
```

Railway will auto-deploy (takes ~2 minutes).

---

## Testing Checklist

Once deployed, verify:

- [ ] `/insights/sales` returns a `chart_url`
- [ ] Opening the URL shows a line chart
- [ ] Chart displays correctly in ChatGPT
- [ ] Data in chart matches the metrics
- [ ] All 6 endpoints have charts
- [ ] Chart generation doesn't slow API (<500ms)

---

## Design Guidelines

**Keep it simple:**
- Use default Chart.js colors (or green/red for good/bad)
- White background
- 600x300px for most charts
- Clear axis labels with units ($, %, etc.)
- No 3D effects or fancy animations

---

## Questions?

**QuickChart Docs:** https://quickchart.io/documentation/
**Live API:** https://buzza-mock-api-production.up.railway.app
**GitHub:** https://github.com/mnavar-evidence/buzza

Reach out to M Navar (mnavar@gmail.com) if you hit any blockers!

---

## Expected Outcome

**Before:**
```json
{
  "gross_sales": 18250.43,
  "net_sales": 17100.12
}
```

**After:**
```json
{
  "gross_sales": 18250.43,
  "net_sales": 17100.12,
  "chart_url": "https://quickchart.io/chart?c=..."
}
```

ChatGPT will automatically embed the chart image inline with the response! 📊
