import { getProjectById } from "../services/projectService.js";

export async function requireProjectOwner(request, response, next) {
  try {
    const project = await getProjectById(request.params.id);

    if (!project) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "Project not found.",
      });
    }

    const authenticatedUserId = request.user?._id?.toString();
    const ownerId = project.ownerId?.toString?.() ?? String(project.ownerId);

    if (authenticatedUserId && authenticatedUserId === ownerId) {
      request.project = project;
      return next();
    }

    return response.status(403).json({
      success: false,
      data: null,
      message: "Only the project owner can perform this action.",
    });
  } catch (error) {
    return next(error);
  }
}
