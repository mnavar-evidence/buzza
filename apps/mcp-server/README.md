# Buzza MCP Server

Early Apps SDK MCP server that proxies the Buzza mock REST API so ChatGPT Developer Mode can call structured tools and render inline widgets.

## Prerequisites
- Node.js 18+
- Mock API running locally on `http://localhost:4000` (run `npm run dev --prefix mock-api`).

## Install dependencies
```bash
npm install --prefix apps/mcp-server
```

## Run in development mode
```bash
npm run dev --prefix apps/mcp-server
```
This starts the MCP server with ts-node. By default it targets the mock API at `http://localhost:4000`; override with `BUZZA_MOCK_API_URL` if needed.

## Run HTTP+SSE bridge (for ChatGPT Custom Tool)
```bash
npm run dev:sse --prefix apps/mcp-server
```
This Express host exposes the MCP server over the legacy HTTP+SSE transport at `http://localhost:4001/sse`. Tunnel this URL (for example with ngrok) before registering it inside ChatGPT's **Custom Tool → New Connector** flow.

## Test the UI templates
```bash
npm run test --prefix apps/mcp-server
```
Vitest + JSDOM validate each widget template renders the expected data bindings, catching regressions before you side-load new builds.

## Build & run compiled server
```bash
npm run build --prefix apps/mcp-server
npm start --prefix apps/mcp-server
```
To serve the SSE bridge from the compiled output:
```bash
npm run start:sse --prefix apps/mcp-server
```

## Deploy to Railway
1. Install the Railway CLI and log in (`npm i -g @railway/cli && railway login`).
2. From `apps/mcp-server/`, run `railway init` (new project) or `railway link`.
3. Set environment variables:
   - `PORT` (Railway injects automatically; keep the existing `process.env.PORT` fallback).
   - `BUZZA_MOCK_API_URL` pointing at your public API (default: `https://buzza.ai` or whichever mock endpoint you expose).
4. Push the build using `railway up --service buzza-mcp-server`. Railway installs dependencies, runs `npm run build`, and executes the default start command (`npm run start:sse`).
5. Once deployed, copy the public Railway URL (e.g., `https://buzza-mcp-production.up.railway.app/sse`) into ChatGPT’s custom connector. No tunnel is required because Railway provides a public HTTPS endpoint.

> Tip: keep the developer tunnel workflow for local iteration, then redeploy to Railway before sharing the connector with teammates.

## Available tools
- `insights.get_sales`
- `insights.get_products`
- `insights.get_trends`
- `campaigns.create_preview`
- `conversation.get_summary`
- `conversation.get_nudges`

Each tool hydrates a SkyBridge-compatible HTML template under `src/ui/` that renders the card/carousel payloads returned from the mock API. Templates keep to the Apps SDK design guidelines—single-purpose cards, concise summaries, accessible typography—and subscribe to tool updates when the host refreshes state.

## Next steps
1. Add telemetry and error handling for downstream API failures.
2. Expand HTML templates into styled components (React/Vite) and bundle assets.
3. Wire authentication when live Clover data replaces the mock pipeline.
