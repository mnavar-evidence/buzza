const express = require('express');
const { randomUUID } = require('crypto');
const { merchantId, merchantName } = require('../data/mockBusiness');

const router = express.Router();

const toneSuffixByKey = {
  upbeat: "Let's make today amazing!",
  friendly: 'We appreciate you stopping by!',
  urgent: 'Hurry - this deal wraps up soon!',
};

router.post('/preview', (req, res) => {
  const body = req.body || {};
  const { channel, goal, tone = 'friendly', offer } = body;

  if (!channel || !goal) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'channel and goal are required fields',
    });
  }

  const previewId = `prev-${randomUUID().slice(0, 8)}`;
  const now = new Date();
  const recommendedSendTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

  const offerText = offer || 'Stop by for our fall favorites today.';
  const toneKey = typeof tone === 'string' ? tone.toLowerCase() : 'friendly';
  const toneSuffix = toneSuffixByKey[toneKey] || toneSuffixByKey.friendly;

  const smsMessage = `Hey ${merchantName} friends! ${offerText} ${toneSuffix}`;
  const emailMessage = `${smsMessage}\n\nUse code BUZZA for a treat on us.`;

  res.json({
    preview_id: previewId,
    channel,
    goal,
    merchant_id: merchantId,
    recommended_send_time: recommendedSendTime,
    audience_size: 132,
    message: channel === 'sms' ? smsMessage : emailMessage,
    follow_up_prompt: 'Would you like to schedule this send or edit the tone?',
  });
});

module.exports = router;
