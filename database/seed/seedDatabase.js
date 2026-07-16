import "dotenv/config";

import { MongoClient } from "mongodb";

import { generateProjects } from "./generateProjects.js";

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined.");
}

if (!databaseName) {
  throw new Error("MONGODB_DB_NAME is not defined.");
}

const client = new MongoClient(mongoUri);

async function seedDatabase() {
  try {
    await client.connect();

    const database = client.db(databaseName);
    const projectsCollection = database.collection("projects");

    const projects = generateProjects(1000);

    const result = await projectsCollection.insertMany(projects);

    console.log(
      `Inserted ${result.insertedCount} synthetic projects.`,
    );
  } finally {
    await client.close();
  }
}

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exitCode = 1;
});