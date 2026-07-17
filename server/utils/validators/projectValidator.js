import { PROJECT_CATEGORIES } from "../../constants/categories.js";
import { EXPERIENCE_LEVELS } from "../../constants/experienceLevels.js";
import { LOCATION_TYPES } from "../../constants/locationTypes.js";
import { PROJECT_STATUSES } from "../../constants/projectStatuses.js";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => isNonEmptyString(item))
  );
}

function isOptionalNonEmptyString(value) {
  return value === undefined || value === null || isNonEmptyString(value);
}

function isStringArrayAllowEmpty(value) {
  return Array.isArray(value) && value.every((item) => isNonEmptyString(item));
}

function validateRole(role, index) {
  const errors = [];
  const label = `Role ${index + 1}`;

  if (!role || typeof role !== "object" || Array.isArray(role)) {
    return [`${label} must be an object.`];
  }

  if (!isNonEmptyString(role.title)) {
    errors.push(`${label} must have a title.`);
  }

  if (!isOptionalNonEmptyString(role.description)) {
    errors.push(
      `${label} description must be a non-empty string when provided.`,
    );
  }

  if (!isStringArray(role.requiredSkills)) {
    errors.push(`${label} must have at least one required skill.`);
  }

  if (!EXPERIENCE_LEVELS.includes(role.experienceLevel)) {
    errors.push(`${label} must have a valid experience level.`);
  }

  if (!Number.isInteger(role.totalPositions) || role.totalPositions < 1) {
    errors.push(`${label} totalPositions must be an integer of at least 1.`);
  }

  return errors;
}

export function validateProject(project) {
  const errors = [];

  if (!project || typeof project !== "object" || Array.isArray(project)) {
    return {
      isValid: false,
      errors: ["Project data must be an object."],
    };
  }

  if (!isNonEmptyString(project.title)) {
    errors.push("Project title is required.");
  }

  if (!isNonEmptyString(project.tagline)) {
    errors.push("Project tagline is required.");
  }

  if (
    !project.description ||
    typeof project.description !== "object" ||
    Array.isArray(project.description)
  ) {
    errors.push("Project description must be an object.");
  } else {
    const requiredDescriptionFields = [
      "overview",
      "goals",
      "currentProgress",
      "lookingFor",
    ];

    for (const field of requiredDescriptionFields) {
      if (!isNonEmptyString(project.description[field])) {
        errors.push(`Description ${field} is required.`);
      }
    }
  }

  if (!isStringArray(project.categories)) {
    errors.push("At least one project category is required.");
  } else {
    const invalidCategories = project.categories.filter(
      (category) => !PROJECT_CATEGORIES.includes(category),
    );

    if (invalidCategories.length > 0) {
      errors.push(
        `Invalid project categories: ${invalidCategories.join(", ")}.`,
      );
    }
  }

  if (
    project.customCategories !== undefined &&
    project.customCategories !== null &&
    !isStringArrayAllowEmpty(project.customCategories)
  ) {
    errors.push("Custom categories must be an array of non-empty strings.");
  }

  if (
    Array.isArray(project.categories) &&
    project.categories.includes("Other") &&
    !isStringArray(project.customCategories)
  ) {
    errors.push(
      "At least one custom category is required when Other is selected.",
    );
  }

  if (!isStringArray(project.technologies)) {
    errors.push("At least one technology is required.");
  }

  if (!Array.isArray(project.roles) || project.roles.length === 0) {
    errors.push("At least one project role is required.");
  } else {
    project.roles.forEach((role, index) => {
      errors.push(...validateRole(role, index));
    });
  }

  if (!LOCATION_TYPES.includes(project.locationType)) {
    errors.push("A valid location type is required.");
  }

  if (
    project.experienceLevel !== undefined &&
    project.experienceLevel !== null &&
    !EXPERIENCE_LEVELS.includes(project.experienceLevel)
  ) {
    errors.push("Project experience level is invalid.");
  }

  if (!isOptionalNonEmptyString(project.weeklyCommitment)) {
    errors.push("Weekly commitment must be a non-empty string when provided.");
  }

  if (!isOptionalNonEmptyString(project.duration)) {
    errors.push("Duration must be a non-empty string when provided.");
  }

  if (!PROJECT_STATUSES.includes(project.status)) {
    errors.push("A valid project status is required.");
  }

  if (project.compensation !== undefined && project.compensation !== null) {
    if (
      typeof project.compensation !== "object" ||
      Array.isArray(project.compensation)
    ) {
      errors.push("Compensation must be an object when provided.");
    } else {
      if (!isNonEmptyString(project.compensation.type)) {
        errors.push(
          "Compensation type is required when compensation is provided.",
        );
      }

      if (
        project.compensation.amount !== undefined &&
        project.compensation.amount !== null &&
        (typeof project.compensation.amount !== "number" ||
          project.compensation.amount < 0)
      ) {
        errors.push("Compensation amount must be a non-negative number.");
      }

      if (
        project.compensation.currency !== undefined &&
        project.compensation.currency !== null &&
        !isNonEmptyString(project.compensation.currency)
      ) {
        errors.push(
          "Compensation currency must be a non-empty string when provided.",
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
