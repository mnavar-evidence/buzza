import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uiDir = path.resolve(__dirname, "..");

function renderTemplate(filename: string, toolOutput: Record<string, unknown>) {
  const html = readFileSync(path.join(uiDir, filename), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    beforeParse(window) {
      window.openai = {
        toolOutput,
        subscribe(callback: () => void) {
          callback();
        },
      };
    },
  });

  return new Promise<JSDOM>((resolve) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => resolve(dom));
    // Safety timer in case DOMContentLoaded already fired
    setTimeout(() => resolve(dom), 0);
  });
}

describe("UI templates", () => {
  it("renders sales card with metrics", async () => {
    const dom = await renderTemplate("sales-card.html", {
      timeframe: "seven_days",
      card: {
        title: "Gross sales",
        metric: { value: "$12,340", change_pct: "+5%", direction: "up" },
        summary: "Sales gained momentum.",
        supporting_metrics: [
          { label: "Avg ticket", value: "$24.10" },
          { label: "Orders", value: "510" },
        ],
      },
      top_flags: [{ message: "Loyalty redemptions dipped." }],
    });

    const doc = dom.window.document;
    expect(doc.getElementById("card-title")?.textContent).toContain("Gross sales");
    expect(doc.querySelectorAll(".supporting-item")).toHaveLength(2);
    expect(doc.querySelector(".flags li")?.textContent ?? "").toContain("Loyalty");
  });

  it("renders product cards list", async () => {
    const dom = await renderTemplate("products-card.html", {
      cards: [
        {
          title: "Top movers",
          items: [
            { label: "Iced Latte", value: "+22%" },
            { label: "Matcha", value: "+15%" },
          ],
        },
        {
          title: "Needs attention",
          items: [{ label: "Pumpkin Muffin", value: "-8%" }],
        },
      ],
    });

    const cards = dom.window.document.querySelectorAll(".card");
    expect(cards).toHaveLength(2);
    expect(cards[0]?.textContent).toContain("Top movers");
  });

  it("renders campaign preview text", async () => {
    const dom = await renderTemplate("campaign-card.html", {
      preview: {
        channel: "sms",
        goal: "boost_loyalty",
        audience_size: 1200,
        recommended_send_time: "Tomorrow 9 AM",
        message: "Hey Luca, double points this weekend!",
        follow_up_prompt: "Schedule this promo",
      },
    });

    const doc = dom.window.document;
    expect(doc.getElementById("message")?.textContent).toContain("double points");
    expect(doc.querySelector(".cta")?.textContent).toContain("Schedule");
  });

  it("renders trend severity badges", async () => {
    const dom = await renderTemplate("trends-card.html", {
      carousel: [
        { title: "Weekend rush", severity: "high", summary: "Staff up after 5pm." },
      ],
    });

    const badge = dom.window.document.querySelector(".badge");
    expect(badge?.textContent).toBe("high");
  });

  it("renders summary cards grid", async () => {
    const dom = await renderTemplate("summary-cards.html", {
      cards: [
        {
          title: "Morning coffee",
          metric: { label: "Avg ticket", value: "$18.10" },
          summary: "Higher office traffic boosted sales.",
          cta: { label: "Remind teams" },
        },
      ],
    });

    const summary = dom.window.document.querySelector(".summary");
    expect(summary?.textContent).toContain("Higher office traffic");
  });

  it("renders nudges carousel entries", async () => {
    const dom = await renderTemplate("nudges-carousel.html", {
      carousel: [
        { title: "Ping loyalty members", summary: "Offer double points", cta: { label: "Draft SMS" } },
      ],
    });

    const title = dom.window.document.querySelector(".card h2");
    expect(title?.textContent).toContain("Ping loyalty members");
  });
});
