const express = require('express');
const {
  getConversationSummary,
  getConversationNudges,
} = require('../data/mockBusiness');

const router = express.Router();

router.get('/summary', (req, res) => {
  const payload = getConversationSummary();
  res.json(payload);
});

router.get('/nudges', (req, res) => {
  const payload = getConversationNudges();
  res.json(payload);
});

module.exports = router;
