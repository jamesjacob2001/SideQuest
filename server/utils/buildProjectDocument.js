import { generateRoleId } from "./generateRoleId.js";

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : value;
}

function normalizeStringArray(values) {
  return values.map((value) => value.trim());
}

export function buildProjectDocument(projectData, ownerId) {
  const roles = projectData.roles.map((role) => ({
    roleId: generateRoleId(),
    title: normalizeString(role.title),
    description: role.description
      ? normalizeString(role.description)
      : null,
    requiredSkills: normalizeStringArray(role.requiredSkills),
    experienceLevel: role.experienceLevel,
    totalPositions: role.totalPositions,
  }));

  return {
    ownerId,
    title: normalizeString(projectData.title),
    tagline: normalizeString(projectData.tagline),
    description: {
      overview: normalizeString(projectData.description.overview),
      goals: normalizeString(projectData.description.goals),
      currentProgress: normalizeString(
        projectData.description.currentProgress,
      ),
      lookingFor: normalizeString(projectData.description.lookingFor),
    },
    categories: normalizeStringArray(projectData.categories),
    customCategories: projectData.customCategories
      ? normalizeStringArray(projectData.customCategories)
      : [],
    technologies: normalizeStringArray(projectData.technologies),
    roles,
    experienceLevel: projectData.experienceLevel ?? null,
    locationType: projectData.locationType,
    location: projectData.location
      ? normalizeString(projectData.location)
      : null,
    weeklyCommitment: projectData.weeklyCommitment
      ? normalizeString(projectData.weeklyCommitment)
      : null,
    duration: projectData.duration
      ? normalizeString(projectData.duration)
      : null,
    compensation: projectData.compensation ?? null,
    status: projectData.status,
    createdAt: new Date(),
  };
}