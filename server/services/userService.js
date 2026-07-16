import { ObjectId } from "mongodb";

import { getDatabase } from "../config/database.js";

function usersCollection() {
  return getDatabase().collection("users");
}

function projectsCollection() {
  return getDatabase().collection("projects");
}

function teamMembershipsCollection() {
  return getDatabase().collection("team_memberships");
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

export async function deleteUserAndRelatedData(userId) {
  const user = await findUserById(userId);

  if (!user) {
    return false;
  }

  const objectId = new ObjectId(userId);
  const ownerIdMatchers = [
    objectId,
    userId,
    objectId.toString(),
  ];

  const ownedProjects = await projectsCollection()
    .find({
      ownerId: {
        $in: ownerIdMatchers,
      },
    })
    .toArray();

  const ownedProjectIds = ownedProjects.map((project) => project._id);

  if (ownedProjectIds.length > 0) {
    await teamMembershipsCollection().deleteMany({
      projectId: {
        $in: ownedProjectIds,
      },
    });

    await projectsCollection().deleteMany({
      _id: {
        $in: ownedProjectIds,
      },
    });
  }

  const membershipUserMatchers = [
    objectId,
    userId,
    objectId.toString(),
  ];

  if (typeof user.userId === "string" && user.userId.trim().length > 0) {
    membershipUserMatchers.push(user.userId);
  }

  await teamMembershipsCollection().deleteMany({
    userId: {
      $in: membershipUserMatchers,
    },
  });

  return deleteUserById(userId);
}
