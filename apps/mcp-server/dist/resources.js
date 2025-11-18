import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const uiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./ui");
function loadTemplate(filename) {
    const filePath = path.join(uiRoot, filename);
    try {
        return readFileSync(filePath, "utf8");
    }
    catch (err) {
        throw new Error(`Failed to load UI template ${filename}: ${err.message}`);
    }
}
export function registerResources(server) {
    const templates = [
        {
            id: "ui://widget/buzza-sales-card.html",
            file: "sales-card.html",
            description: "Shows summarized sales metrics and key flags for the selected timeframe.",
        },
        {
            id: "ui://widget/buzza-products-card.html",
            file: "products-card.html",
            description: "Highlights top and underperforming menu items with recommendations.",
        },
        {
            id: "ui://widget/buzza-trends-card.html",
            file: "trends-card.html",
            description: "Lists trend signals detected across sales and customer behavior.",
        },
        {
            id: "ui://widget/buzza-campaign-card.html",
            file: "campaign-card.html",
            description: "Displays generated SMS or email campaign previews ready for review.",
        },
        {
            id: "ui://widget/buzza-summary-cards.html",
            file: "summary-cards.html",
            description: "Shows the daily highlight cards surfaced before suggesting actions.",
        },
        {
            id: "ui://widget/buzza-nudges-carousel.html",
            file: "nudges-carousel.html",
            description: "Carousel of recommended nudges and follow-up ideas for the merchant.",
        },
    ];
    for (const template of templates) {
        const html = loadTemplate(template.file);
        server.registerResource(`resource-${template.file}`, template.id, {}, async () => ({
            contents: [
                {
                    uri: template.id,
                    mimeType: "text/html+skybridge",
                    text: html,
                    _meta: {
                        "openai/widgetDescription": template.description,
                        "openai/widgetPrefersBorder": true,
                        "openai/widgetCSP": {
                            connect_domains: ["quickchart.io"],
                            resource_domains: ["quickchart.io"],
                        },
                    },
                },
            ],
        }));
    }
}
