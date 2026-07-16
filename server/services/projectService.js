import { ObjectId } from "mongodb";

import { getDatabase } from "../config/database.js";

export async function getPublicProjects(page, limit) {
  const database = getDatabase();
  const projectsCollection = database.collection("projects");

  const filter = {
    status: {
      $ne: "Completed",
    },
  };

  const skip = (page - 1) * limit;

  const [projects, totalProjects] = await Promise.all([
    projectsCollection
      .find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .toArray(),

    projectsCollection.countDocuments(filter),
  ]);

  return {
    projects,
    totalProjects,
  };
}

export async function getProjectById(projectId) {
  const database = getDatabase();

  return database.collection("projects").findOne({
    _id: new ObjectId(projectId),
  });
}

export async function createProject(projectDocument) {
  const database = getDatabase();

  const result = await database
    .collection("projects")
    .insertOne(projectDocument);

  return {
    ...projectDocument,
    _id: result.insertedId,
  };
}

export async function updateProjectById(
  projectId,
  projectDocument,
) {
  const database = getDatabase();
  const objectId = new ObjectId(projectId);

  const result = await database.collection("projects").updateOne(
    {
      _id: objectId,
    },
    {
      $set: projectDocument,
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return database.collection("projects").findOne({
    _id: objectId,
  });
}

export async function deleteProjectById(projectId) {
  const database = getDatabase();

  const result = await database.collection("projects").deleteOne({
    _id: new ObjectId(projectId),
  });

  return result.deletedCount === 1;
}