import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import app from "./app.js";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "./config/database.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../.env"),
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();

    const server = app.listen(PORT, () => {
      console.log(`SideQuest server running on http://localhost:${PORT}`);
    });

    async function shutDown(signal) {
      console.log(`\n${signal} received. Closing SideQuest server...`);

      server.close(async () => {
        await closeDatabaseConnection();
        console.log("Server and MongoDB connection closed.");
        process.exit(0);
      });
    }

    process.on("SIGINT", () => shutDown("SIGINT"));
    process.on("SIGTERM", () => shutDown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start SideQuest server:", error.message);
    process.exit(1);
  }
}

startServer();
