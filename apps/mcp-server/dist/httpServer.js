import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "./serverSetup.js";
const app = express();
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log("HTTP request", req.method, req.originalUrl, { ip: req.ip });
    next();
});
app.use(express.json());
app.options("/messages", (_req, res) => {
    res.status(204).end();
});
const sessions = new Map();
app.get("/sse", async (req, res) => {
    // eslint-disable-next-line no-console
    console.log("Incoming SSE connection", {
        ip: req.ip,
        headers: req.headers["user-agent"],
    });
    const transport = new SSEServerTransport("/messages", res);
    const server = createMcpServer();
    sessions.set(transport.sessionId, { transport });
    res.on("close", async () => {
        sessions.delete(transport.sessionId);
        try {
            await transport.close();
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.warn("Error closing transport", error);
        }
    });
    transport.onclose = () => {
        // eslint-disable-next-line no-console
        console.log("SSE connection closed", transport.sessionId);
        sessions.delete(transport.sessionId);
    };
    try {
        await server.connect(transport);
    }
    catch (error) {
        sessions.delete(transport.sessionId);
        // eslint-disable-next-line no-console
        console.error("Failed to establish SSE connection", error);
        res.end();
    }
});
app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    // eslint-disable-next-line no-console
    console.log("Received POST /messages", {
        sessionId,
        ip: req.ip,
    });
    if (typeof sessionId !== "string") {
        res.status(400).send("sessionId query parameter required");
        return;
    }
    const session = sessions.get(sessionId);
    if (!session) {
        res.status(404).send("Unknown session");
        // eslint-disable-next-line no-console
        console.warn("No session found for message", sessionId);
        return;
    }
    try {
        await session.transport.handlePostMessage(req, res, req.body);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error handling message", error);
    }
});
const port = Number.parseInt(process.env.PORT ?? "", 10) || 4001;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Buzza MCP SSE server listening at http://localhost:${port}/sse`);
});
