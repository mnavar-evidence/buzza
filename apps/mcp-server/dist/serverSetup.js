import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { fetchConversationNudges, fetchConversationSummary, fetchProductInsights, fetchSalesInsight, fetchTrendInsights, createCampaignPreview, } from "./mockApiClient.js";
import { registerResources } from "./resources.js";
export function createMcpServer() {
    const server = new McpServer({
        name: "buzza-mcp-server",
        version: "0.1.0",
    });
    registerResources(server);
    server.registerTool("insights.get_sales", {
        title: "Get Sales Insight",
        description: "Use this when the user asks for recent sales performance metrics.",
        annotations: {
            readOnlyHint: true,
        },
        inputSchema: {
            timeframe: z
                .enum(["today", "yesterday", "seven_days", "thirty_days", "custom"])
                .optional()
                .describe("Time window to analyze. Defaults to seven_days."),
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-sales-card.html",
            "openai/toolInvocation/invoking": "Fetching sales insight…",
            "openai/toolInvocation/invoked": "Sales insight ready.",
        },
    }, async ({ timeframe = "seven_days" }) => {
        const insight = await fetchSalesInsight(timeframe);
        return {
            structuredContent: {
                timeframe: insight.timeframe,
                card: insight.card,
                supporting_metrics: insight.card.supporting_metrics ?? insight.supporting_metrics ?? [],
                top_flags: insight.top_flags,
            },
            content: [
                {
                    type: "text",
                    text: insight.card.summary ??
                        `Sales over ${insight.timeframe} totaled $${insight.gross_sales.toFixed(2)}.`,
                },
            ],
            _meta: {
                merchant_id: insight.merchant_id,
                merchant_name: insight.merchant_name,
            },
        };
    });
    server.registerTool("insights.get_products", {
        title: "Get Product Insights",
        description: "Use this when the user wants top or underperforming products with recommendations.",
        annotations: {
            readOnlyHint: true,
        },
        inputSchema: {
            timeframe: z
                .enum(["thirty_days", "seven_days"])
                .optional()
                .describe("Time window to analyze product mix. Defaults to thirty_days."),
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-products-card.html",
            "openai/toolInvocation/invoking": "Gathering product insight…",
            "openai/toolInvocation/invoked": "Product insight ready.",
        },
    }, async ({ timeframe = "thirty_days" }) => {
        const insight = await fetchProductInsights(timeframe);
        return {
            structuredContent: {
                timeframe: insight.timeframe,
                cards: insight.cards,
            },
            content: [
                {
                    type: "text",
                    text: insight.cards[0]?.summary ??
                        `Top product: ${insight.winners[0]?.name ?? "n/a"}.`,
                },
            ],
            _meta: {
                merchant_id: insight.merchant_id,
                merchant_name: insight.merchant_name,
            },
        };
    });
    server.registerTool("insights.get_trends", {
        title: "Get Trend Insights",
        description: "Use this when the user wants anomaly detection or trend signals.",
        annotations: {
            readOnlyHint: true,
        },
        inputSchema: {
            horizon: z
                .enum(["short_term", "medium_term"])
                .optional()
                .describe("Trend horizon. Defaults to short_term."),
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-trends-card.html",
            "openai/toolInvocation/invoking": "Scanning trend signals…",
            "openai/toolInvocation/invoked": "Trend insight ready.",
        },
    }, async ({ horizon = "short_term" }) => {
        const insight = await fetchTrendInsights(horizon);
        return {
            structuredContent: {
                horizon: insight.horizon,
                carousel: insight.carousel,
            },
            content: [
                {
                    type: "text",
                    text: `Detected ${insight.carousel.length} trend signals for review.`,
                },
            ],
            _meta: {
                merchant_id: insight.merchant_id,
                merchant_name: insight.merchant_name,
            },
        };
    });
    server.registerTool("campaigns.create_preview", {
        title: "Create Campaign Preview",
        description: "Use this when the user asks for an SMS or email campaign draft.",
        inputSchema: {
            channel: z.enum(["sms", "email"]),
            goal: z.enum([
                "reactivate_dormant_customers",
                "boost_loyalty",
                "drive_new_visits",
            ]),
            tone: z
                .string()
                .optional()
                .describe("Optional tone like friendly, upbeat, or urgent."),
            offer: z
                .string()
                .optional()
                .describe("Optional promotion copy, e.g., Buy 1 Get 1."),
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-campaign-card.html",
            "openai/toolInvocation/invoking": "Drafting campaign…",
            "openai/toolInvocation/invoked": "Campaign draft ready.",
        },
    }, async ({ channel, goal, tone, offer }) => {
        const preview = await createCampaignPreview({ channel, goal, tone, offer });
        return {
            structuredContent: {
                preview,
            },
            content: [
                {
                    type: "text",
                    text: `Drafted ${preview.channel.toUpperCase()} campaign for ${preview.goal.replace(/_/g, " ")}.`,
                },
            ],
            _meta: {
                merchant_id: preview.merchant_id,
            },
        };
    });
    server.registerTool("conversation.get_summary", {
        title: "Get Conversation Summary",
        description: "Use this to recap the latest dashboard cards before proposing actions.",
        annotations: {
            readOnlyHint: true,
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-summary-cards.html",
            "openai/toolInvocation/invoking": "Gathering daily highlights…",
            "openai/toolInvocation/invoked": "Summary ready.",
        },
    }, async () => {
        const summary = await fetchConversationSummary();
        return {
            structuredContent: {
                cards: summary.cards,
            },
            content: [
                {
                    type: "text",
                    text: summary.cards[0]?.summary ?? "Here are the latest highlights.",
                },
            ],
            _meta: {
                merchant_id: summary.merchant_id,
                merchant_name: summary.merchant_name,
            },
        };
    });
    server.registerTool("conversation.get_nudges", {
        title: "Get Recommended Nudges",
        description: "Use this when the user wants actionable next steps or campaign ideas.",
        annotations: {
            readOnlyHint: true,
        },
        _meta: {
            "openai/outputTemplate": "ui://widget/buzza-nudges-carousel.html",
            "openai/toolInvocation/invoking": "Collecting suggested actions…",
            "openai/toolInvocation/invoked": "Here are a few ideas.",
        },
    }, async () => {
        const nudges = await fetchConversationNudges();
        return {
            structuredContent: {
                carousel: nudges.carousel,
            },
            content: [
                {
                    type: "text",
                    text: `${nudges.carousel.length} actions you can take right now.`,
                },
            ],
            _meta: {
                merchant_id: nudges.merchant_id,
                merchant_name: nudges.merchant_name,
            },
        };
    });
    return server;
}
