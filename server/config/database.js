import { MongoClient } from "mongodb";

let client;
let database;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB_NAME || "sidequest";

  if (!uri) {
    throw new Error("MONGODB_URI is not defined.");
  }

  client = new MongoClient(uri);
  await client.connect();

  database = client.db(databaseName);
  await database.command({ ping: 1 });

  console.log(`Connected to MongoDB database: ${databaseName}`);

  return database;
}

export function getDatabase() {
  if (!database) {
    throw new Error("Database connection has not been established.");
  }

  return database;
}

export function getMongoClient() {
  if (!client) {
    throw new Error("Database connection has not been established.");
  }

  return client;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}
