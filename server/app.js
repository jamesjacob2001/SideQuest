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
import dashboardRoutes from "./routes/dashboardRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamMembershipRoutes from "./routes/teamMembershipRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../.env"),
});

const app = express();
const passport = configurePassport();

app.set("passport", passport);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use((request, response, next) => {
  const origin = process.env.CLIENT_ORIGIN;

  if (origin) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS",
    );
  }

  if (request.method === "OPTIONS") {
    return response.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(createSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team-memberships", teamMembershipRoutes);

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
