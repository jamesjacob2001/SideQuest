import { generateRoleId } from "./generateRoleId.js";

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : value;
}

function normalizeStringArray(values) {
  return values.map((value) => value.trim());
}

function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function selectUpdatedValue(existingProject, projectUpdates, field) {
  return hasOwnProperty(projectUpdates, field)
    ? projectUpdates[field]
    : existingProject[field];
}

export function buildProjectDocument(projectData, ownerId) {
  const roles = projectData.roles.map((role) => ({
    roleId: generateRoleId(),
    title: normalizeString(role.title),
    description: role.description ? normalizeString(role.description) : null,
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
      currentProgress: normalizeString(projectData.description.currentProgress),
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

export function buildUpdatedProjectDocument(existingProject, projectUpdates) {
  const descriptionUpdates = projectUpdates.description ?? {};

  const description = {
    overview: normalizeString(
      hasOwnProperty(descriptionUpdates, "overview")
        ? descriptionUpdates.overview
        : existingProject.description.overview,
    ),
    goals: normalizeString(
      hasOwnProperty(descriptionUpdates, "goals")
        ? descriptionUpdates.goals
        : existingProject.description.goals,
    ),
    currentProgress: normalizeString(
      hasOwnProperty(descriptionUpdates, "currentProgress")
        ? descriptionUpdates.currentProgress
        : existingProject.description.currentProgress,
    ),
    lookingFor: normalizeString(
      hasOwnProperty(descriptionUpdates, "lookingFor")
        ? descriptionUpdates.lookingFor
        : existingProject.description.lookingFor,
    ),
  };

  const roles = hasOwnProperty(projectUpdates, "roles")
    ? projectUpdates.roles.map((role) => {
        const existingRole = role.roleId
          ? existingProject.roles.find(
              (currentRole) => currentRole.roleId === role.roleId,
            )
          : null;

        return {
          roleId: existingRole?.roleId ?? generateRoleId(),
          title: normalizeString(role.title),
          description: role.description
            ? normalizeString(role.description)
            : null,
          requiredSkills: normalizeStringArray(role.requiredSkills),
          experienceLevel: role.experienceLevel,
          totalPositions: role.totalPositions,
        };
      })
    : existingProject.roles;

  const categories = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "categories",
  );

  const customCategories = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "customCategories",
  );

  const technologies = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "technologies",
  );

  const location = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "location",
  );

  const weeklyCommitment = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "weeklyCommitment",
  );

  const duration = selectUpdatedValue(
    existingProject,
    projectUpdates,
    "duration",
  );

  return {
    ownerId: existingProject.ownerId,

    title: normalizeString(
      selectUpdatedValue(existingProject, projectUpdates, "title"),
    ),

    tagline: normalizeString(
      selectUpdatedValue(existingProject, projectUpdates, "tagline"),
    ),

    description,

    categories: normalizeStringArray(categories),

    customCategories: customCategories
      ? normalizeStringArray(customCategories)
      : [],

    technologies: normalizeStringArray(technologies),

    roles,

    experienceLevel: selectUpdatedValue(
      existingProject,
      projectUpdates,
      "experienceLevel",
    ),

    locationType: selectUpdatedValue(
      existingProject,
      projectUpdates,
      "locationType",
    ),

    location: location ? normalizeString(location) : null,

    weeklyCommitment: weeklyCommitment
      ? normalizeString(weeklyCommitment)
      : null,

    duration: duration ? normalizeString(duration) : null,

    compensation: selectUpdatedValue(
      existingProject,
      projectUpdates,
      "compensation",
    ),

    status: selectUpdatedValue(existingProject, projectUpdates, "status"),

    createdAt: existingProject.createdAt,
  };
}
