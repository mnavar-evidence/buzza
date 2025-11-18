import axios from "axios";

const MOCK_API_BASE_URL = process.env.BUZZA_MOCK_API_URL ?? "http://localhost:4000";

type Direction = "up" | "down" | "flat" | null | undefined;

type CardCTA = {
  label: string;
  follow_up_prompt: string;
};

type CardMetric = {
  label: string;
  value: string;
  change_pct?: string | null;
  direction?: Direction;
};

type CardItem = {
  label: string;
  value: string;
  annotation?: string | null;
};

type InsightCard = {
  id: string;
  title: string;
  metric?: CardMetric;
  items?: CardItem[];
  summary?: string;
  preview?: string;
  supporting_metrics?: CardItem[];
  cta?: CardCTA;
  severity?: "low" | "medium" | "high";
  follow_up_prompts?: string[];
};

type SalesInsight = {
  merchant_id: string;
  merchant_name: string;
  timeframe: string;
  gross_sales: number;
  net_sales: number;
  avg_ticket: number;
  change_vs_prior: number;
  top_flags: Array<{ type: string; message: string }>;
  card: InsightCard;
  supporting_metrics?: CardItem[];
  chart_url?: string;
};

type ProductInsight = {
  merchant_id: string;
  merchant_name: string;
  timeframe: string;
  winners: Array<{
    product_id: string;
    name: string;
    share_of_sales: number;
    lift_vs_average?: number;
    change_vs_prior?: number;
    recommended_action: string;
  }>;
  underperformers: Array<{
    product_id: string;
    name: string;
    share_of_sales: number;
    lift_vs_average?: number;
    change_vs_prior?: number;
    recommended_action: string;
  }>;
  cards: InsightCard[];
  chart_url?: string;
};

type TrendInsightResponse = {
  merchant_id: string;
  merchant_name: string;
  horizon: string;
  insights: Array<{
    id: string;
    category: string;
    severity: string;
    message: string;
    suggested_prompts?: string[];
  }>;
  carousel: InsightCard[];
  chart_url?: string;
};

type CampaignPreviewRequest = {
  channel: "sms" | "email";
  goal: "reactivate_dormant_customers" | "boost_loyalty" | "drive_new_visits";
  tone?: string;
  offer?: string;
};

type CampaignPreviewResponse = {
  preview_id: string;
  channel: "sms" | "email";
  goal: string;
  merchant_id: string;
  recommended_send_time: string;
  audience_size: number;
  message: string;
  follow_up_prompt: string;
  chart_url?: string;
};

type ConversationSummaryResponse = {
  merchant_id: string;
  merchant_name: string;
  cards: InsightCard[];
  chart_url?: string;
};

type ConversationNudgesResponse = {
  merchant_id: string;
  merchant_name: string;
  carousel: InsightCard[];
  chart_url?: string;
};

export async function fetchSalesInsight(timeframe: string): Promise<SalesInsight> {
  const { data } = await axios.get<SalesInsight>(`${MOCK_API_BASE_URL}/insights/sales`, {
    params: { timeframe },
  });
  return data;
}

export async function fetchProductInsights(timeframe: string): Promise<ProductInsight> {
  const { data } = await axios.get<ProductInsight>(`${MOCK_API_BASE_URL}/insights/products`, {
    params: { timeframe },
  });
  return data;
}

export async function fetchTrendInsights(horizon: string): Promise<TrendInsightResponse> {
  const { data } = await axios.get<TrendInsightResponse>(`${MOCK_API_BASE_URL}/insights/trends`, {
    params: { horizon },
  });
  return data;
}

export async function createCampaignPreview(
  payload: CampaignPreviewRequest
): Promise<CampaignPreviewResponse> {
  const { data } = await axios.post<CampaignPreviewResponse>(`${MOCK_API_BASE_URL}/campaigns/preview`, payload);
  return data;
}

export async function fetchConversationSummary(): Promise<ConversationSummaryResponse> {
  const { data } = await axios.get<ConversationSummaryResponse>(`${MOCK_API_BASE_URL}/conversation/summary`);
  return data;
}

export async function fetchConversationNudges(): Promise<ConversationNudgesResponse> {
  const { data } = await axios.get<ConversationNudgesResponse>(`${MOCK_API_BASE_URL}/conversation/nudges`);
  return data;
}

export type {
  InsightCard,
  CardMetric,
  CardItem,
  CardCTA,
  ConversationSummaryResponse,
  ConversationNudgesResponse,
  CampaignPreviewResponse,
};
