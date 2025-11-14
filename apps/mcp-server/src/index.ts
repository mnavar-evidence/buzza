import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createMcpServer } from "./serverSetup.js";

const server = createMcpServer();

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // eslint-disable-next-line no-console
  console.log("Buzza MCP server listening on stdio");

  const shutdown = async () => {
    try {
      await transport.close();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Error while shutting down transport", err);
    } finally {
      process.exit(0);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Keep process alive until a signal arrives
  await new Promise(() => {});
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start Buzza MCP server", err);
  process.exit(1);
});
