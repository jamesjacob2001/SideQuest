import { ObjectId } from "mongodb";

import { getDatabase } from "../config/database.js";

function usersCollection() {
  return getDatabase().collection("users");
}

export async function listUsers() {
  return usersCollection()
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function findUserById(userId) {
  return usersCollection().findOne({
    _id: new ObjectId(userId),
  });
}

export async function findUserByEmail(email) {
  return usersCollection().findOne({
    email: email.trim().toLowerCase(),
  });
}

export async function findUserByUsername(username) {
  return usersCollection().findOne({
    username: username.trim(),
  });
}

export async function createUser(userDocument) {
  const result = await usersCollection().insertOne(userDocument);

  return {
    ...userDocument,
    _id: result.insertedId,
  };
}

export async function updateUserById(userId, userUpdates) {
  const objectId = new ObjectId(userId);

  const result = await usersCollection().updateOne(
    {
      _id: objectId,
    },
    {
      $set: {
        ...userUpdates,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return usersCollection().findOne({
    _id: objectId,
  });
}

export async function deleteUserById(userId) {
  const result = await usersCollection().deleteOne({
    _id: new ObjectId(userId),
  });

  return result.deletedCount === 1;
}
