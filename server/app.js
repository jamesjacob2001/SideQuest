import dotenv from "dotenv";
import express from "express";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { getDatabase } from "./config/database.js";
import { configurePassport } from "./config/passport.js";
import { createSessionMiddleware } from "./config/session.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../.env"),
});

const app = express();
const passport = configurePassport();

app.set("passport", passport);

app.use(express.json());
app.use(createSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    message: "SideQuest API is running.",
  });
});

app.get("/api/health/database", async (request, response, next) => {
  try {
    const database = getDatabase();

    await database.command({ ping: 1 });

    response.json({
      status: "ok",
      message: "SideQuest is connected to MongoDB.",
      database: database.databaseName,
    });
  } catch (error) {
    next(error);
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
