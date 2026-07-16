import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  closeDatabaseConnection,
  connectToDatabase,
  getDatabase,
} from "../config/database.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../../.env"),
});

async function assignProjectOwners() {
  await connectToDatabase();

  const database = getDatabase();
  const users = await database
    .collection("users")
    .find({}, { projection: { _id: 1 } })
    .toArray();

  if (users.length === 0) {
    throw new Error("No users found. Import users before assigning owners.");
  }

  const projects = await database
    .collection("projects")
    .find({
      $or: [
        { ownerId: "TEMP_OWNER" },
        { ownerId: { $exists: false } },
        { ownerId: null },
      ],
    })
    .project({ _id: 1 })
    .toArray();

  if (projects.length === 0) {
    console.log("No projects need owner assignment.");
    return;
  }

  const operations = projects.map((project, index) => {
    const owner = users[index % users.length];

    return {
      updateOne: {
        filter: { _id: project._id },
        update: {
          $set: {
            ownerId: owner._id,
            updatedAt: new Date(),
          },
        },
      },
    };
  });

  const result = await database.collection("projects").bulkWrite(operations);

  console.log(
    `Assigned owners to ${result.modifiedCount} projects using ${users.length} users.`,
  );
}

assignProjectOwners()
  .catch((error) => {
    console.error("Failed to assign project owners:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabaseConnection();
  });
