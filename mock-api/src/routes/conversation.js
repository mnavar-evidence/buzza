const express = require('express');
const {
  getConversationSummary,
  getConversationNudges,
} = require('../data/mockBusiness');
const {
  generateSparklineChart,
  generateActionMatrixChart,
} = require('../utils/chartGenerator');

const router = express.Router();

const sparklineLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const sparklineSeries = [
  { label: 'Sales', trend: [2050, 2120, 2300, 2450, 2680, 2845, 2910], color: '#2563eb' },
  { label: 'Orders', trend: [150, 152, 160, 158, 165, 169, 172], color: '#10b981' },
  { label: 'Avg ticket', trend: [15.9, 16.1, 16.5, 16.8, 17.1, 17.3, 17.4], color: '#f97316' },
];

const actionImpactMap = {
  action_sms: { impact: 8, effort: 2, lift: 1200 },
  action_loyalty: { impact: 9, effort: 7, lift: 3500 },
  action_staff: { impact: 6, effort: 4, lift: 800 },
};

async function resolveChart(generator) {
  try {
    return await generator();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Conversation chart error', error);
    return null;
  }
}

function buildSparklineMetrics() {
  return {
    labels: sparklineLabels,
    series: sparklineSeries,
  };
}

function buildActionMatrixData(actions = []) {
  return actions.map((action) => {
    const metrics = actionImpactMap[action.id] || { impact: 5, effort: 5, lift: 900 };
    return {
      title: action.title,
      impact: metrics.impact,
      effort: metrics.effort,
      lift: metrics.lift,
    };
  });
}

router.get('/summary', async (req, res) => {
  const payload = getConversationSummary();
  const metrics = buildSparklineMetrics();
  const chartUrl = await resolveChart(() => generateSparklineChart(metrics));

  res.json({
    ...payload,
    chart_url: chartUrl,
  });
});

router.get('/nudges', async (req, res) => {
  const payload = getConversationNudges();
  const matrixData = buildActionMatrixData(payload.carousel);
  const chartUrl = await resolveChart(() => generateActionMatrixChart(matrixData));

  res.json({
    ...payload,
    chart_url: chartUrl,
  });
});

module.exports = router;
