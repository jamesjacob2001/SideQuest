import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  closeDatabaseConnection,
  connectToDatabase,
  getDatabase,
} from "../../server/config/database.js";

const DEMO_PASSWORD = "Password123!";
const SALT_ROUNDS = 10;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../../.env"),
});

async function rehashUserPasswords() {
  await connectToDatabase();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);
  const result = await getDatabase().collection("users").updateMany(
    {},
    {
      $set: {
        passwordHash,
        updatedAt: new Date(),
      },
    },
  );

  console.log(
    `Updated ${result.modifiedCount} users with bcrypt demo password.`,
  );
  console.log(`Demo password for seeded users: ${DEMO_PASSWORD}`);
}

rehashUserPasswords()
  .catch((error) => {
    console.error("Failed to rehash user passwords:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabaseConnection();
  });
