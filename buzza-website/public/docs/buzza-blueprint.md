# Buzza Blueprint

## Vision
Buzza brings Clover merchant insights into a conversational experience by deploying a ChatGPT App that can answer day-to-day operator questions, surface proactive nudges, and trigger done-for-you marketing workflows. The assistant becomes the single interface that busy restaurant owners consult for decisions, removing dashboard friction and boosting re-engagement.

## Target Merchant Persona
- Independent restaurants, cafes, and food trucks with 1–3 locations
- Operators who already turn to ChatGPT for copywriting or pricing ideas but lack time to revisit analytics dashboards
- Clover-powered shops that installed legacy MarketBuzz, BeSocial, UMarket, or Unlock Insights yet never converted to sustained usage

## Engagement Loop
1. **Signal detection**: Buzza’s data pipeline identifies anomalies (sales dips, inventory shortages, segment churn).
2. **Proactive nudge**: Automated text/email invites the owner to “Ask Buzza what happened.” Link opens the ChatGPT conversation.
3. **Conversational insight**: ChatGPT App fetches contextual insight via Buzza APIs and explains impact in plain language.
4. **Action shortcut**: Within the thread, merchants can request SMS/email previews, plan discounts, or schedule follow-up nudges.
5. **Closed-loop analytics**: Results flow back into Buzza scoring to refine future nudges and ROI reporting.

## Functional Pillars
- **Insight Retrieval**: Sales, product mix, and trend endpoints summarized for quick answers such as “How were my weekend sales?”
- **What-if Reasoning**: Scenario prompts ingest live metrics to advise on decisions like closing early or staffing adjustments.
- **Campaign Automation**: Merchants trigger Buzza’s done-for-you SMS/email workflows without leaving chat.
- **Voice + Mobile Friendly**: Optional voice mode powered by ChatGPT App capabilities ensures low-friction usage between service rushes.

## Technical Architecture
- **ChatGPT App Manifest**: Hosted at `https://marketbuzz.ai/.well-known/ai-plugin.json` describing OAuth, categories, and permissions for Buzza.
- **OAuth Broker**: Clover merchant authorizes Buzza; the same token is reused for ChatGPT sessions via existing secure storage.
- **API Layer**: REST endpoints (see `/public/chatgpt-openapi.yaml`) expose summarized insights built on Buzza analytics.
- **Data Fabric**: Combines Clover transactional exports, Buzza CRM events, and campaign performance metrics into daily aggregates.
- **Nudge Engine**: Rules + ML models monitor KPIs and queue automations, emitting `insight_id`s consumed by the ChatGPT conversation.
- **Audit + Logging**: Every AI recommendation is logged with merchant context to support transparency and chargeback defense.

## Demo Mode Strategy
- Ship the ChatGPT App with demo data on day one so prospects can experiment instantly.
- Toggle between demo and live data via `demo_mode=true` query param; live mode remains gated behind OAuth.
- Capture lead intent by requesting email/phone before upgrading from demo to live data access.

## Monetization Tiers
1. **Free**: 3 insight lookups/day, limited historical range, up to 3 campaign previews per month.
2. **Pro ($29/mo)**: Unlimited insights, predictive traffic alerts, campaign templates with recommended send times.
3. **Growth ($79/mo)**: Multi-location dashboards, automated nudges, and unlimited sends with performance benchmarking.

## Rollout Plan
1. **Sprint 1 – Foundation**: Ship mockable API endpoints, ChatGPT manifest, and landing page updates; recruit 10 beta merchants.
2. **Sprint 2 – Nudges**: Wire proactive email/SMS triggers to ChatGPT deep links; capture first conversion metrics.
3. **Sprint 3 – Automation**: Integrate campaign preview -> send workflows; introduce paywall and tier gating.
4. **Sprint 4 – Analytics**: Enrich ROI dashboards, refine ML scoring, and prepare Clover Marketplace relaunch under Buzza.

## Success Metrics
- Activation: % of Clover installs that authenticate Buzza within 7 days.
- Engagement: Weekly Active Merchants inside ChatGPT vs legacy dashboard logins.
- Conversion: Free-to-Pro upgrade rate and incremental revenue per merchant.
- Retention: 90-day churn compared to control cohort without ChatGPT nudges.
- Campaign Lift: Average revenue per AI-generated campaign relative to manual sends.

## Next Actions
- Finalize OAuth broker endpoints and register verification token with OpenAI.
- Populate the mock dataset pipeline for the demo experience.
- Launch early-access invite to top 50 Buzza customers (or legacy MarketBuzz installs) and capture qualitative feedback through the ChatGPT session transcript export.
