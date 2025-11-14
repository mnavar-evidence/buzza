const merchantId = 'demo-cafe-001';
const merchantName = 'Buzza Demo Cafe';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

const salesSnapshots = {
  today: {
    gross_sales: 2650.42,
    net_sales: 2487.56,
    avg_ticket: 16.78,
    change_vs_prior: 0.06,
    top_flags: [
      {
        type: 'opportunity',
        message: 'Consider a mid-afternoon upsell to extend the lunchtime rush.',
      },
    ],
  },
  yesterday: {
    gross_sales: 0,
    net_sales: 0,
    avg_ticket: 0,
    change_vs_prior: -1,
    top_flags: [
      {
        type: 'negative_trend',
        message: 'No sales were recorded yesterday — let’s spark demand today.',
      },
    ],
  },
  seven_days: {
    gross_sales: 18250.43,
    net_sales: 17100.12,
    avg_ticket: 18.34,
    change_vs_prior: -0.08,
    top_flags: [
      {
        type: 'negative_trend',
        message: 'Monday lunch revenue fell 15% week-over-week.',
      },
      {
        type: 'opportunity',
        message: 'Upsell pastries after 3pm to lift ticket size.',
      },
    ],
  },
  thirty_days: {
    gross_sales: 79752.98,
    net_sales: 74988.12,
    avg_ticket: 19.22,
    change_vs_prior: 0.03,
    top_flags: [
      {
        type: 'alert',
        message: 'Weekend staffing costs up 12% vs. last month.',
      },
      {
        type: 'opportunity',
        message: 'Loyalty members respond well to Tuesday latte promos.',
      },
    ],
  },
};

const productInsights = {
  winners: [
    {
      product_id: 'latte-12oz',
      name: 'Vanilla Oat Latte',
      share_of_sales: 0.18,
      lift_vs_average: 0.12,
      recommended_action: 'Promote during morning rush with SMS.',
    },
    {
      product_id: 'coldbrew-16oz',
      name: 'Nitro Cold Brew',
      share_of_sales: 0.14,
      lift_vs_average: 0.09,
      recommended_action: 'Highlight on the menu board after noon for commuters.',
    },
  ],
  underperformers: [
    {
      product_id: 'breakfast-burrito',
      name: 'Sunrise Burrito',
      share_of_sales: 0.04,
      change_vs_prior: -0.22,
      recommended_action: 'Bundle with drip coffee at $9.99.',
    },
    {
      product_id: 'avo-toast',
      name: 'Market Toast',
      share_of_sales: 0.03,
      change_vs_prior: -0.18,
      recommended_action: 'Rotate toppings and feature on social this weekend.',
    },
  ],
};

const trendInsights = [
  {
    id: 'trend-20241010-evening',
    category: 'foot_traffic',
    severity: 'medium',
    message: 'Evening walk-ins down 12% for two consecutive weeks.',
    suggested_prompts: [
      'Buzza, should I close early today?',
      'Can you ask Buzza to draft a happy hour promo?'
    ],
  },
  {
    id: 'trend-20241012-loyalty',
    category: 'campaign',
    severity: 'low',
    message: 'Loyalty members are opening emails 8% less than last month.',
    suggested_prompts: [
      'What subject line tests should I try for loyalty emails?',
    ],
  },
];

const customerSnapshot = {
  timeframe: 'yesterday',
  new_customers: 0,
  repeat_customers: 12,
  average_visit_frequency: 1.32,
  note: 'No new customers yesterday — time to reach out to prospects.',
};

const loyaltyTip = {
  id: 'loyalty_tip',
  title: 'Did you know?',
  summary: 'Loyal customers spend 2× more — reward them regularly.',
  cta: {
    label: 'Reward loyal guests',
    follow_up_prompt: 'Help me plan a loyalty perk for returning guests.',
  },
};

const recommendedActions = [
  {
    id: 'action_sms',
    title: 'Reach your customers instantly',
    summary: 'Send a quick SMS with today’s special to re-engage regulars.',
    preview: '“Hey crew! Pop in today for $2 off fall lattes. We’ve missed you!”',
    cta: {
      label: 'Draft SMS',
      follow_up_prompt: 'Draft an upbeat SMS to invite regulars back today.',
    },
  },
  {
    id: 'action_loyalty',
    title: 'Boost loyalty momentum',
    summary: 'Offer a surprise reward to guests who visited twice this month.',
    preview: '“Double stamps this week for our weekday regulars.”',
    cta: {
      label: 'Plan loyalty perk',
      follow_up_prompt: 'Suggest a loyalty perk for guests with 2+ visits this month.',
    },
  },
  {
    id: 'action_staff',
    title: 'Adjust staffing ahead of dips',
    summary: 'Schedule a quick huddle to prep for slower Monday lunches.',
    preview: 'Note: Lunch revenue dropped 15% last Monday. Brief staff on upsells.',
    cta: {
      label: 'Prep staff brief',
      follow_up_prompt: 'Outline talking points to energize staff for slow lunches.',
    },
  },
];

const flagCtas = {
  negative_trend: {
    label: 'Plan recovery move',
    follow_up_prompt: 'Recommend a recovery action for this negative trend.',
  },
  opportunity: {
    label: 'Act on this opportunity',
    follow_up_prompt: 'Suggest how to capitalize on this opportunity.',
  },
  alert: {
    label: 'Review next steps',
    follow_up_prompt: 'Help me respond to this alert with concrete actions.',
  },
  default: {
    label: 'Ask for next step',
    follow_up_prompt: 'What should I do next based on this insight?',
  },
};

function formatChange(changeVsPrior) {
  if (typeof changeVsPrior !== 'number' || Number.isNaN(changeVsPrior)) {
    return null;
  }

  return {
    value: percentFormatter.format(changeVsPrior),
    direction: changeVsPrior > 0 ? 'up' : changeVsPrior < 0 ? 'down' : 'flat',
  };
}

function buildSalesCard(timeframe, snapshot) {
  const flag = snapshot.top_flags?.[0];
  const change = formatChange(snapshot.change_vs_prior);
  const cta = flag ? flagCtas[flag.type] || flagCtas.default : flagCtas.default;

  return {
    id: `sales_${timeframe}`,
    title: timeframe === 'today' ? 'Today’s sales pulse' : 'Sales snapshot',
    metric: {
      label: 'Gross sales',
      value: usdFormatter.format(snapshot.gross_sales),
      change_pct: change ? change.value : null,
      direction: change ? change.direction : null,
    },
    summary: flag?.message || 'Performance is holding steady. Ask for deeper breakdowns anytime.',
    supporting_metrics: [
      {
        label: 'Net sales',
        value: usdFormatter.format(snapshot.net_sales),
      },
      {
        label: 'Average ticket',
        value: usdFormatter.format(snapshot.avg_ticket),
        annotation: 'per order',
      },
    ],
    cta,
  };
}

function buildProductCards(timeframe, winners, underperformers) {
  const topWinner = winners[0];
  const topUnderperformer = underperformers[0];

  const winnersCard = {
    id: `products_top_${timeframe}`,
    title: 'Top sellers to spotlight',
    items: winners.slice(0, 3).map((item) => ({
      label: item.name,
      value: `${Math.round(item.share_of_sales * 100)}% of sales`,
      annotation: item.recommended_action,
    })),
    summary: topWinner?.recommended_action || 'Highlight your best performers during peak hours.',
    cta: {
      label: 'Promote top seller',
      follow_up_prompt: `Draft an SMS featuring ${topWinner?.name || 'our top-selling item'}.`,
    },
  };

  const underperformersCard = {
    id: `products_watch_${timeframe}`,
    title: 'Items to revive',
    items: underperformers.slice(0, 3).map((item) => ({
      label: item.name,
      value: `${Math.round(Math.abs(item.change_vs_prior || 0) * 100)}% drop`,
      annotation: item.recommended_action,
    })),
    summary: topUnderperformer?.recommended_action || 'Bundle low performers or refresh the offer to regain momentum.',
    cta: {
      label: 'Create recovery plan',
      follow_up_prompt: `Help me revive ${topUnderperformer?.name || 'my underperforming items'}.`,
    },
  };

  return { winnersCard, underperformersCard };
}

function buildTrendCarousel(insights) {
  return insights.map((insight) => ({
    id: insight.id,
    title: insight.category === 'foot_traffic'
      ? 'Foot traffic shift'
      : insight.category === 'campaign'
        ? 'Campaign engagement change'
        : 'Business trend',
    severity: insight.severity,
    summary: insight.message,
    follow_up_prompts: insight.suggested_prompts,
    cta: {
      label: 'Dig in',
      follow_up_prompt: insight.suggested_prompts?.[0]
        || 'Help me understand this trend in more detail.',
    },
  }));
}

const conversationSummaryCards = () => {
  const yesterdaySales = salesSnapshots.yesterday;
  const salesCard = {
    id: 'summary_sales_yesterday',
    title: 'Sales yesterday',
    metric: {
      label: 'Sales yesterday',
      value: usdFormatter.format(yesterdaySales.gross_sales),
      direction: 'down',
    },
    summary: yesterdaySales.top_flags[0].message,
    cta: {
      label: 'Boost today’s sales',
      follow_up_prompt: 'Draft a quick promo to boost sales after yesterday.',
    },
  };

  const customersCard = {
    id: 'summary_new_customers',
    title: 'New customers yesterday',
    metric: {
      label: 'New customers',
      value: `${customerSnapshot.new_customers}`,
      direction: customerSnapshot.new_customers > 0 ? 'up' : 'flat',
    },
    summary: customerSnapshot.note,
    cta: {
      label: 'Plan outreach',
      follow_up_prompt: 'Suggest a campaign to attract new customers this week.',
    },
  };

  const topProduct = productInsights.winners[0];
  const productCard = {
    id: 'summary_top_product',
    title: 'Top selling product',
    metric: {
      label: topProduct.name,
      value: `${Math.round(topProduct.share_of_sales * 100)}% of sales`,
      direction: 'up',
    },
    summary: topProduct.recommended_action,
    cta: {
      label: 'Promote top seller',
      follow_up_prompt: `Draft a promo highlighting ${topProduct.name}.`,
    },
  };

  return [salesCard, customersCard, productCard, loyaltyTip];
};

function getSalesInsight(timeframe = 'seven_days') {
  const snapshot = salesSnapshots[timeframe] || salesSnapshots.seven_days;
  const card = buildSalesCard(timeframe, snapshot);
  return {
    merchant_id: merchantId,
    merchant_name: merchantName,
    timeframe,
    ...snapshot,
    card,
  };
}

function getProductInsights(timeframe = 'thirty_days') {
  const { winnersCard, underperformersCard } = buildProductCards(
    timeframe,
    productInsights.winners,
    productInsights.underperformers,
  );
  return {
    merchant_id: merchantId,
    merchant_name: merchantName,
    timeframe,
    ...productInsights,
    cards: [winnersCard, underperformersCard],
  };
}

function getTrendInsights(horizon = 'short_term') {
  const carousel = buildTrendCarousel(trendInsights);
  return {
    merchant_id: merchantId,
    merchant_name: merchantName,
    horizon,
    insights: trendInsights,
    carousel,
  };
}

function getConversationSummary() {
  return {
    merchant_id: merchantId,
    merchant_name: merchantName,
    cards: conversationSummaryCards(),
  };
}

function getConversationNudges() {
  return {
    merchant_id: merchantId,
    merchant_name: merchantName,
    carousel: recommendedActions,
  };
}

module.exports = {
  merchantId,
  merchantName,
  getSalesInsight,
  getProductInsights,
  getTrendInsights,
  getConversationSummary,
  getConversationNudges,
};
