const express = require('express');
const {
  getSalesInsight,
  getProductInsights,
  getTrendInsights,
} = require('../data/mockBusiness');
const {
  generateSalesChart,
  generateProductChart,
  generateTrendChart,
} = require('../utils/chartGenerator');

const router = express.Router();

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const BASE_WEEKLY_SALES = [2100, 1850, 2300, 2450, 2800, 3200, 2900];
const BASE_WEEKLY_TOTAL = BASE_WEEKLY_SALES.reduce((sum, value) => sum + value, 0);

function clampChange(change) {
  if (typeof change !== 'number' || Number.isNaN(change)) {
    return 0;
  }
  return Math.min(0.9, Math.max(-0.9, change));
}

function buildWeeklySalesSeries(snapshot) {
  const ratio = snapshot?.gross_sales
    ? snapshot.gross_sales / BASE_WEEKLY_TOTAL
    : 1;

  const currentWeek = BASE_WEEKLY_SALES.map(
    (dayValue) => Math.round(dayValue * ratio),
  );

  const normalizedChange = clampChange(snapshot?.change_vs_prior ?? 0);
  const baseline = 1 + normalizedChange || 1;
  const previousWeek = currentWeek.map((value) => Math.max(0, Math.round(value / baseline)));

  return {
    labels: WEEK_LABELS,
    currentWeek,
    previousWeek,
  };
}

function buildProductChartSeries(productInsights) {
  const winners = productInsights?.winners || [];
  const underperformers = productInsights?.underperformers || [];

  return [
    ...winners.map((item) => ({
      name: item.name,
      percentage: Math.round((item.share_of_sales || 0) * 100),
      status: 'winner',
    })),
    ...underperformers.map((item) => ({
      name: item.name,
      percentage: Math.round((item.share_of_sales || 0) * 100),
      status: 'underperformer',
    })),
  ].slice(0, 5);
}

function buildTrendSeries(days = 30) {
  const labels = Array.from({ length: days }, (_, index) => `Day ${index + 1}`);
  const sales = labels.map((_, index) => Math.round(1900 + 180 * Math.sin(index / 3) + index * 25));
  const traffic = labels.map((_, index) => Math.round(120 + 15 * Math.cos(index / 2) + index * 1.5));
  const avgTicket = labels.map(
    (_, index) => Number((16 + 1.2 * Math.sin(index / 4) + index * 0.05).toFixed(2)),
  );

  return {
    labels,
    sales,
    traffic,
    avgTicket,
    anomalies: [8, 22],
  };
}

async function resolveChart(generator) {
  try {
    return await generator();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Chart generation error', error);
    return null;
  }
}

router.get('/sales', async (req, res) => {
  const { timeframe = 'seven_days' } = req.query;
  const payload = getSalesInsight(timeframe);
  const weeklySeries = buildWeeklySalesSeries(payload);

  const chartUrl = await resolveChart(() => generateSalesChart(weeklySeries));

  res.json({
    ...payload,
    chart_url: chartUrl,
  });
});

router.get('/products', async (req, res) => {
  const { timeframe = 'thirty_days' } = req.query;
  const payload = getProductInsights(timeframe);
  const productSeries = buildProductChartSeries(payload);

  const chartUrl = await resolveChart(() => generateProductChart(productSeries));

  res.json({
    ...payload,
    chart_url: chartUrl,
  });
});

router.get('/trends', async (req, res) => {
  const { horizon = 'short_term' } = req.query;
  const payload = getTrendInsights(horizon);
  const trendSeries = buildTrendSeries();

  const chartUrl = await resolveChart(() => generateTrendChart(trendSeries));

  res.json({
    ...payload,
    chart_url: chartUrl,
  });
});

module.exports = router;
