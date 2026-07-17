import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  closeDatabaseConnection,
  connectToDatabase,
  getDatabase,
} from "../config/database.js";

const PENDING_COUNT = 100;
const ACCEPTED_COUNT = 150;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

dotenv.config({
  path: resolve(currentDirectory, "../../.env"),
});

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickApplicant(users, ownerId, usedApplicantIds) {
  const ownerKey = String(ownerId);
  const candidates = users.filter((user) => {
    const userId = String(user._id);
    return userId !== ownerKey && !usedApplicantIds.has(userId);
  });

  if (candidates.length === 0) {
    return null;
  }

  return randomItem(candidates);
}

function buildMembership(project, applicant, status) {
  const role = randomItem(project.roles);
  const now = new Date();

  return {
    projectId: project._id,
    applicantId: applicant._id,
    roleId: role.roleId,
    roleTitle: role.title,
    status,
    createdAt: now,
    updatedAt: now,
    ...(status === "accepted"
      ? {
          joinedAt: now,
        }
      : {}),
  };
}

async function seedTeamMemberships() {
  await connectToDatabase();

  const database = getDatabase();
  const users = await database
    .collection("users")
    .find({}, { projection: { _id: 1 } })
    .toArray();

  const projects = await database
    .collection("projects")
    .find(
      {
        roles: {
          $exists: true,
          $ne: [],
        },
        ownerId: {
          $exists: true,
          $nin: [null, "TEMP_OWNER"],
        },
      },
      {
        projection: {
          ownerId: 1,
          roles: 1,
          title: 1,
        },
      },
    )
    .toArray();

  if (users.length < 2) {
    throw new Error("Need at least 2 users to seed memberships.");
  }

  if (projects.length === 0) {
    throw new Error("No projects with roles found to seed memberships.");
  }

  const existingPairs = new Set(
    (
      await database
        .collection("team_memberships")
        .find({}, { projection: { projectId: 1, applicantId: 1 } })
        .toArray()
    ).map(
      (membership) =>
        `${membership.projectId.toString()}:${membership.applicantId.toString()}`,
    ),
  );

  const documents = [];
  const usedPairs = new Set(existingPairs);

  function tryAddMembership(status, targetCount) {
    let attempts = 0;
    const maxAttempts = targetCount * 20;

    while (
      documents.filter((doc) => doc.status === status).length < targetCount &&
      attempts < maxAttempts
    ) {
      attempts += 1;
      const project = randomItem(projects);
      const pairKeyPrefix = `${project._id.toString()}:`;
      const usedOnProject = new Set(
        [...usedPairs]
          .filter((key) => key.startsWith(pairKeyPrefix))
          .map((key) => key.slice(pairKeyPrefix.length)),
      );

      const applicant = pickApplicant(users, project.ownerId, usedOnProject);

      if (!applicant || !project.roles?.length) {
        continue;
      }

      const pairKey = `${project._id.toString()}:${applicant._id.toString()}`;

      if (usedPairs.has(pairKey)) {
        continue;
      }

      usedPairs.add(pairKey);
      documents.push(buildMembership(project, applicant, status));
    }
  }

  tryAddMembership("pending", PENDING_COUNT);
  tryAddMembership("accepted", ACCEPTED_COUNT);

  if (documents.length === 0) {
    console.log("No new memberships to insert (pairs may already exist).");
    return;
  }

  const result = await database
    .collection("team_memberships")
    .insertMany(documents, { ordered: false });

  const pendingInserted = documents.filter(
    (doc) => doc.status === "pending",
  ).length;
  const acceptedInserted = documents.filter(
    (doc) => doc.status === "accepted",
  ).length;

  console.log(
    `Inserted ${result.insertedCount} team memberships (${pendingInserted} pending, ${acceptedInserted} accepted).`,
  );
}

seedTeamMemberships()
  .catch((error) => {
    console.error("Failed to seed team memberships:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabaseConnection();
  });
