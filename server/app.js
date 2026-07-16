import express from "express";

import { getDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

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
