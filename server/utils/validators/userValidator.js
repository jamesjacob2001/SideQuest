import { AVAILABILITY_OPTIONS } from "../../constants/availabilityOptions.js";
import { USER_EXPERIENCE_LEVELS } from "../../constants/userExperienceLevels.js";
import { YEAR_LABELS } from "../../constants/yearLabels.js";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalNonEmptyString(value) {
  return value === undefined || value === null || isNonEmptyString(value);
}

function isStringArrayAllowEmpty(value) {
  return Array.isArray(value) && value.every((item) => isNonEmptyString(item));
}

function isValidEmail(value) {
  return isNonEmptyString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePortfolioLinks(portfolioLinks) {
  const errors = [];

  if (portfolioLinks === undefined || portfolioLinks === null) {
    return errors;
  }

  if (typeof portfolioLinks !== "object" || Array.isArray(portfolioLinks)) {
    return ["portfolioLinks must be an object."];
  }

  for (const field of ["github", "linkedin", "personalSite"]) {
    if (!isOptionalNonEmptyString(portfolioLinks[field])) {
      errors.push(
        `portfolioLinks.${field} must be a non-empty string when provided.`,
      );
    }
  }

  return errors;
}

export function validateRegistration(userData) {
  const errors = [];

  if (!userData || typeof userData !== "object" || Array.isArray(userData)) {
    return {
      isValid: false,
      errors: ["Registration data must be an object."],
    };
  }

  if (!isNonEmptyString(userData.username)) {
    errors.push("Username is required.");
  }

  if (!isNonEmptyString(userData.name)) {
    errors.push("Name is required.");
  }

  if (!isValidEmail(userData.email)) {
    errors.push("A valid email is required.");
  }

  if (!isNonEmptyString(userData.password) || userData.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateProfileUpdate(profileUpdates) {
  const errors = [];

  if (
    !profileUpdates ||
    typeof profileUpdates !== "object" ||
    Array.isArray(profileUpdates)
  ) {
    return {
      isValid: false,
      errors: ["Profile update data must be an object."],
    };
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "username") &&
    !isNonEmptyString(profileUpdates.username)
  ) {
    errors.push("Username must be a non-empty string when provided.");
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "name") &&
    !isNonEmptyString(profileUpdates.name)
  ) {
    errors.push("Name must be a non-empty string when provided.");
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "email") &&
    !isValidEmail(profileUpdates.email)
  ) {
    errors.push("Email must be valid when provided.");
  }

  for (const field of [
    "university",
    "major",
    "bio",
    "profileImageUrl",
    "location",
  ]) {
    if (
      Object.prototype.hasOwnProperty.call(profileUpdates, field) &&
      !isOptionalNonEmptyString(profileUpdates[field])
    ) {
      errors.push(`${field} must be a non-empty string when provided.`);
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "graduationYear") &&
    profileUpdates.graduationYear !== null &&
    (!Number.isInteger(profileUpdates.graduationYear) ||
      profileUpdates.graduationYear < 1900)
  ) {
    errors.push("graduationYear must be a valid year when provided.");
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "yearLabel") &&
    profileUpdates.yearLabel !== null &&
    profileUpdates.yearLabel !== undefined &&
    !YEAR_LABELS.includes(profileUpdates.yearLabel)
  ) {
    errors.push("yearLabel must be a valid class standing when provided.");
  }

  for (const field of ["technicalSkills", "interests", "rolePreferences"]) {
    if (
      Object.prototype.hasOwnProperty.call(profileUpdates, field) &&
      !isStringArrayAllowEmpty(profileUpdates[field])
    ) {
      errors.push(`${field} must be an array of non-empty strings.`);
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "experienceLevel") &&
    profileUpdates.experienceLevel !== null &&
    profileUpdates.experienceLevel !== undefined &&
    !USER_EXPERIENCE_LEVELS.includes(profileUpdates.experienceLevel)
  ) {
    errors.push("experienceLevel must be Beginner, Intermediate, or Advanced.");
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "availability") &&
    profileUpdates.availability !== null &&
    profileUpdates.availability !== undefined &&
    !AVAILABILITY_OPTIONS.includes(profileUpdates.availability)
  ) {
    errors.push("availability must be a valid weekly availability option.");
  }

  if (Object.prototype.hasOwnProperty.call(profileUpdates, "portfolioLinks")) {
    errors.push(...validatePortfolioLinks(profileUpdates.portfolioLinks));
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "isRecruiting") &&
    typeof profileUpdates.isRecruiting !== "boolean"
  ) {
    errors.push("isRecruiting must be a boolean when provided.");
  }

  if (
    Object.prototype.hasOwnProperty.call(profileUpdates, "password") ||
    Object.prototype.hasOwnProperty.call(profileUpdates, "passwordHash")
  ) {
    errors.push("Password cannot be updated through the profile endpoint.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
