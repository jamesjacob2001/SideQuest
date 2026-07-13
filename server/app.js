import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    message: "SideQuest API is running.",
  });
});

export default app;