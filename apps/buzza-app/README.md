# Buzza Mock App (Apps SDK Preview)

This directory holds the evolving assets for the Buzza ChatGPT App built with OpenAI's Apps SDK. The initial baby step is to expose the existing mock REST API (`mock-api/`) as an OpenAPI tool that can be side-loaded into ChatGPT Developer Mode.

## Current Contents
- `app.manifest.json` – lightweight manifest pointing ChatGPT Developer Mode at the local mock OpenAPI spec.

## How to Test (Developer Mode)
1. Start the mock API so the OpenAPI spec is reachable:
   ```bash
   npm run dev --prefix mock-api
   ```
2. In ChatGPT Developer Mode, side-load the app by pointing to `app.manifest.json` (file URL or localhost server). ChatGPT will connect to the local mock API defined in the manifest.

## Next Baby Steps
1. Flesh out the manifest with UI surface definitions once the Apps SDK UI components are available.
2. Continue aligning the MCP/App runtime with the latest Apps SDK APIs (conversation summary + nudges already mapped).
3. Replace the localhost URLs with the deployed `https://buzza.ai` endpoints when the API is hosted in production.
