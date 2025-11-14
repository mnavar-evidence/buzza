const express = require('express');
const {
  getSalesInsight,
  getProductInsights,
  getTrendInsights,
} = require('../data/mockBusiness');

const router = express.Router();

router.get('/sales', (req, res) => {
  const { timeframe = 'seven_days' } = req.query;
  const payload = getSalesInsight(timeframe);
  res.json(payload);
});

router.get('/products', (req, res) => {
  const { timeframe = 'thirty_days' } = req.query;
  const payload = getProductInsights(timeframe);
  res.json(payload);
});

router.get('/trends', (req, res) => {
  const { horizon = 'short_term' } = req.query;
  const payload = getTrendInsights(horizon);
  res.json(payload);
});

module.exports = router;
