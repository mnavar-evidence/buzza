# Apps SDK Planning - Buzza Mock App (Preview)

## Persona & Context
- **Persona**: Clover-connected independent restaurant operator (1-3 locations) who already dips into ChatGPT for marketing copy and quick business questions.
- **Context**: Heads into ChatGPT during mid-day lull or after close to understand performance, troubleshoot dips, and trigger customer outreach without switching apps.
- **North Star Outcome**: In a single chat session, operator uncovers insight (e.g., sales dip), understands root cause, and launches a ready-to-send campaign draft.

## Use Case Hypotheses
| Priority | Scenario | Success Statement |
| --- | --- | --- |
| P0 | Diagnose recent sales performance | "In under two turns, Buzza surfaces key metrics + flags for the past 7 days so I know what changed and what to do." |
| P0 | Identify top/underperforming menu items | "ChatGPT highlights winners/laggards with actionable recommendations I can brief the team on." |
| P1 | Spot emerging anomalies / trends | "I get a concise list of anomalies with follow-up prompts to investigate further." |
| P1 | Draft marketing campaign | "I can request an SMS/email preview that matches tone + offer and is ready to schedule." |

## Evaluation Prompts
### Direct (name Buzza or specific data)
1. "Buzza, show me my seven-day sales insight for the demo cafe."
2. "Ask Buzza which products are winning this month."
3. "Buzza mock API: what's the biggest negative trend right now?"
4. "Use Buzza to pull today's sales change vs prior." 
5. "Tell Buzza to draft an upbeat SMS for dormant customers." 

### Indirect (intent-only)
1. "How were my cafe sales this week compared to last?"
2. "What menu items should I push today?"
3. "Is there anything unusual in my business trends lately?"
4. "I need a quick text to bring back lapsed regulars."
5. "Give me the highlights I need before the staff meeting." 

### Negative (should NOT trigger)
1. "Teach me how Clover point-of-sale hardware works."
2. "Write a generic latte recipe for my blog."
3. "Show nationwide coffee industry stats." 

## Minimum Lovable Feature Scoping
| Scenario | Inline Data Needed | Write Actions | State Notes |
| --- | --- | --- | --- |
| Sales insight (P0) | Timeframe, gross/net sales, avg ticket, change %, top flags | None (read-only) | Persist chosen timeframe for follow-ups. |
| Product insight (P0) | Winners + underperformers (name, share, recommendation) | None | Maintain last timeframe per session. |
| Trend insight (P1) | Trend list (id, category, severity, message, prompts) | None | Allow user to click follow-up prompts -> call same tool. |
| Campaign preview (P1) | Generated message, recommended send time, audience size, follow-up prompt | Creates draft preview (write) | Store last preview ID for potential schedule flow. |

## Tool Drafts (Mock Phase)
| Tool Name | Description | Input Schema (initial) | Output Fields |
| --- | --- | --- | --- |
| `insights.get_sales` | Use this when the user asks for recent sales performance metrics. | `{ timeframe: enum[today, yesterday, seven_days, thirty_days] }` | `merchant_id`, `merchant_name`, `timeframe`, `gross_sales`, `net_sales`, `avg_ticket`, `change_vs_prior`, `top_flags[]` |
| `insights.get_products` | Use this when the user wants top or underperforming products with recommendations. | `{ timeframe: enum[thirty_days, seven_days] }` | `merchant_id`, `merchant_name`, `timeframe`, `winners[]`, `underperformers[]` |
| `insights.get_trends` | Use this when the user wants anomaly detection or trend signals. | `{ horizon: enum[short_term, medium_term] }` | `merchant_id`, `merchant_name`, `horizon`, `insights[]` |
| `campaigns.create_preview` | Use this when the user asks for an SMS/email campaign draft. | `{ channel: enum[sms,email], goal: enum[reactivate_dormant_customers,boost_loyalty,drive_new_visits], tone?: string, offer?: string }` | `preview_id`, `channel`, `goal`, `recommended_send_time`, `audience_size`, `message`, `follow_up_prompt` |
| `conversation.get_summary` | Use this to open the chat with daily highlight cards (sales, customers, product, loyalty tip). | `{}` | `cards[]` each following the InsightCard shape |
| `conversation.get_nudges` | Use this when the user asks “What should I do next?” to surface a carousel of recommended actions. | `{}` | `carousel[]` of InsightCard entries with preview + CTA |

## Component Intent (to iterate later)
- **Sales/Product/Trend**: start as read-only inline cards mirroring the production dashboard tiles (headline metric + microcopy + 1 CTA). Use compact metadata for change deltas instead of full tables. Future enhancement could allow a carousel of timeframes.
- **Campaign Preview**: inline viewer with "Edit tone" and "Schedule" CTA stubs; confirmation required for future scheduling. Keep copy concise (≤3 short sentences) and add alt text for any imagery.
- **Insight Carousels**: when listing multiple recommended actions (e.g., nudges) present 3–5 cards with consistent hierarchy (title, benefit, single CTA). Avoid nested navigation.
- **Fullscreen**: reserve for heatmap/RFM previews where the operator needs a richer layout; coordinate with Apps SDK once fullscreen mode is available.

## Visual + Tone Guardrails
- Follow ChatGPT system typography and colors; Buzza branding appears only via iconography or inline imagery.
- Provide alt text for all charts or thumbnails surfaced in cards.
- Limit CTAs to one primary action (+ optional secondary) per surface and ensure label describes the outcome (e.g., "Draft SMS" not "Click here").
- Copy style: supportive, action-driven, mirroring production phrasing such as "Reach your customers instantly" or "Track engagement trends".
- No promotional upsell language unless explicitly responding to a request about premium features; keep focus on immediate value in-session.

## Card Payload Shapes (Mock API Targets)
- **Metric card**: `{ id, title, metric: { label, value, change_pct?, trend? }, summary, cta?: { label, follow_up_prompt } }`
- **List card**: `{ id, title, items: [{ label, value, annotation }], summary?, cta? }`
- **Carousel card**: array of metric/list cards limited to ≥3 and ≤6 entries; each entry shares the same CTA key structure.
- **Campaign draft card**: `{ id, channel, headline, message, audience_size, recommended_send_time, follow_up_prompt }`
- Keep numeric values formatted server-side (e.g., `$5,257.41`) to reduce formatting logic in the app runtime.

## Iteration Prep
- **Golden Prompt Rotation**: Weekly during dogfood; track discovery accuracy for direct/indirect prompts above.
- **Telemetry TODO**: log tool invocations, preview generation counts, and timeframe preferences once runtime exists.
- **Open Questions**: How to surface multi-location rollups? What confirmation UX is required before real campaign sends?
