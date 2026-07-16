import {
  findUserById,
  listUsers,
} from "../services/userService.js";
import { sanitizeUser, sanitizeUsers } from "../utils/sanitizeUser.js";

export async function listPublicUsers(request, response, next) {
  try {
    const users = await listUsers();

    return response.status(200).json({
      success: true,
      data: sanitizeUsers(users),
      message: "Users retrieved successfully.",
    });
  } catch (error) {
    return next(error);
  }
}

export async function showUser(request, response, next) {
  try {
    const user = await findUserById(request.params.id);

    if (!user) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "User not found.",
      });
    }

    return response.status(200).json({
      success: true,
      data: sanitizeUser(user),
      message: "User retrieved successfully.",
    });
  } catch (error) {
    return next(error);
  }
}
