import bcrypt from "bcrypt";
import passport from "passport";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../services/userService.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { validateRegistration } from "../utils/validators/userValidator.js";

const SALT_ROUNDS = 10;

export async function register(request, response, next) {
  try {
    const validation = validateRegistration(request.body);

    if (!validation.isValid) {
      return response.status(400).json({
        success: false,
        data: null,
        message: "Registration validation failed.",
        errors: validation.errors,
      });
    }

    const email = request.body.email.trim().toLowerCase();
    const username = request.body.username.trim();
    const name = request.body.name.trim();
    const password = request.body.password;

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return response.status(409).json({
        success: false,
        data: null,
        message: "Email is already in use.",
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return response.status(409).json({
        success: false,
        data: null,
        message: "Username is already in use.",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const now = new Date();

    const createdUser = await createUser({
      username,
      name,
      email,
      passwordHash,
      university: null,
      major: null,
      graduationYear: null,
      yearLabel: null,
      bio: null,
      technicalSkills: [],
      interests: [],
      rolePreferences: [],
      experienceLevel: null,
      availability: null,
      portfolioLinks: {
        github: null,
        linkedin: null,
        personalSite: null,
      },
      profileImageUrl: null,
      location: null,
      projectsOwned: [],
      projectsJoined: [],
      isRecruiting: true,
      createdAt: now,
      updatedAt: now,
    });

    request.login(createdUser, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return response.status(201).json({
        success: true,
        data: sanitizeUser(createdUser),
        message: "Account created successfully.",
      });
    });
  } catch (error) {
    return next(error);
  }
}

export function login(request, response, next) {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return response.status(401).json({
        success: false,
        data: null,
        message: info?.message || "Invalid email or password.",
      });
    }

    request.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return response.status(200).json({
        success: true,
        data: sanitizeUser(user),
        message: "Logged in successfully.",
      });
    });
  })(request, response, next);
}

export function logout(request, response, next) {
  request.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    request.session.destroy((destroyError) => {
      if (destroyError) {
        return next(destroyError);
      }

      response.clearCookie("connect.sid");

      return response.status(200).json({
        success: true,
        data: null,
        message: "Logged out successfully.",
      });
    });
  });
}

export function getCurrentUser(request, response) {
  return response.status(200).json({
    success: true,
    data: sanitizeUser(request.user),
    message: "Current user retrieved successfully.",
  });
}
