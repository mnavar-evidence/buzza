const express = require('express');
const { randomUUID } = require('crypto');
const { merchantId, merchantName } = require('../data/mockBusiness');
const { generateCampaignAudienceChart } = require('../utils/chartGenerator');

const router = express.Router();

const toneSuffixByKey = {
  upbeat: "Let's make today amazing!",
  friendly: 'We appreciate you stopping by!',
  urgent: 'Hurry - this deal wraps up soon!',
};

const audienceProfiles = {
  default: [
    { segment: 'Loyal', percentage: 30 },
    { segment: 'Regular', percentage: 50 },
    { segment: 'At risk', percentage: 20 },
  ],
  reactivation: [
    { segment: 'Loyal', percentage: 22 },
    { segment: 'Dormant', percentage: 31 },
    { segment: 'At risk', percentage: 29 },
    { segment: 'Prospects', percentage: 18 },
  ],
};

async function resolveChart(generator) {
  try {
    return await generator();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Campaign chart error', error);
    return null;
  }
}

function buildAudienceBreakdown(goal = '') {
  if (typeof goal !== 'string') {
    return audienceProfiles.default;
  }

  const normalizedGoal = goal.toLowerCase();
  if (normalizedGoal.includes('reactivate') || normalizedGoal.includes('winback')) {
    return audienceProfiles.reactivation;
  }

  return audienceProfiles.default;
}

function hydrateAudience(goal) {
  const breakdown = buildAudienceBreakdown(goal);
  const baseAudienceSize = 132;
  let runningTotal = 0;

  const segments = breakdown.map((segment, index) => {
    const isLast = index === breakdown.length - 1;
    if (isLast) {
      return {
        ...segment,
        count: Math.max(0, baseAudienceSize - runningTotal),
      };
    }

    const count = Math.round((segment.percentage / 100) * baseAudienceSize);
    runningTotal += count;
    return {
      ...segment,
      count,
    };
  });

  return { segments, audienceSize: baseAudienceSize };
}

router.post('/preview', async (req, res) => {
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
  const { segments, audienceSize } = hydrateAudience(goal);
  const chartUrl = await resolveChart(() => generateCampaignAudienceChart(segments));

  res.json({
    preview_id: previewId,
    channel,
    goal,
    merchant_id: merchantId,
    recommended_send_time: recommendedSendTime,
    audience_size: audienceSize,
    audience_breakdown: segments,
    message: channel === 'sms' ? smsMessage : emailMessage,
    follow_up_prompt: 'Would you like to schedule this send or edit the tone?',
    chart_url: chartUrl,
  });
});

module.exports = router;
