import axios from "axios";
const MOCK_API_BASE_URL = process.env.BUZZA_MOCK_API_URL ?? "http://localhost:4000";
export async function fetchSalesInsight(timeframe) {
    const { data } = await axios.get(`${MOCK_API_BASE_URL}/insights/sales`, {
        params: { timeframe },
    });
    return data;
}
export async function fetchProductInsights(timeframe) {
    const { data } = await axios.get(`${MOCK_API_BASE_URL}/insights/products`, {
        params: { timeframe },
    });
    return data;
}
export async function fetchTrendInsights(horizon) {
    const { data } = await axios.get(`${MOCK_API_BASE_URL}/insights/trends`, {
        params: { horizon },
    });
    return data;
}
export async function createCampaignPreview(payload) {
    const { data } = await axios.post(`${MOCK_API_BASE_URL}/campaigns/preview`, payload);
    return data;
}
export async function fetchConversationSummary() {
    const { data } = await axios.get(`${MOCK_API_BASE_URL}/conversation/summary`);
    return data;
}
export async function fetchConversationNudges() {
    const { data } = await axios.get(`${MOCK_API_BASE_URL}/conversation/nudges`);
    return data;
}
