# Marketbuzz Monorepo

This repository now contains two cooperating pieces that make up the early Buzza experience:

- `buzza-website`: the marketing landing page built with Create React App + TailwindCSS.
- `mock-api`: an Express-based mock service that implements the ChatGPT App contract with a demo merchant dataset.

## Getting Started

### Requirements
- Node.js 18+
- npm 9+

### Install dependencies
```
npm install --prefix mock-api
npm install --prefix buzza-website
```

### Run the mock API
```
npm run dev --prefix mock-api
```
The server listens on `http://localhost:4000`, exposes the ChatGPT manifest at `/.well-known/ai-plugin.json`, and serves the OpenAPI document at `/chatgpt-openapi.yaml`.

### Run the Apps SDK MCP server
```
npm install --prefix apps/mcp-server
npm run dev --prefix apps/mcp-server
```
The MCP server bridges the mock API into ChatGPT Developer Mode and renders the inline cards/carousels for summaries, insights, and campaign previews.

### Run the landing page (optional)
```
npm start --prefix buzza-website
```
This serves the marketing site at `http://localhost:3000`.

## ChatGPT App (Mock)
- Manifest: `http://localhost:4000/.well-known/ai-plugin.json`
- OpenAPI: `http://localhost:4000/chatgpt-openapi.yaml`
- Key endpoints:
  - `GET /insights/sales`
  - `GET /insights/products`
  - `GET /insights/trends`
  - `POST /campaigns/preview`
  - `GET /conversation/summary`
  - `GET /conversation/nudges`

The responses are deterministic and represent the fictional **Buzza Demo Cafe**. They allow the ChatGPT App flow to be exercised end-to-end before OAuth and live merchant data are introduced.

## Next Steps Toward Live Data
1. Add authentication middleware that swaps the mock merchant for the authenticated merchant context (OAuth tokens, merchant IDs).
2. Replace static data providers with adapters that call real Clover/Buzza analytics services.
3. Extend the schema to support multi-location rollups and per-merchant campaign history.
4. Add automated tests covering the API surface and contract examples (e.g., using supertest or pact-style checks).
# buzza
