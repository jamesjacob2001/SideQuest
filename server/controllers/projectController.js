import { getPublicProjects, getProjectById, } from "../services/projectService.js";

export async function listProjects(request, response, next) {
  try {
    const projects = await getPublicProjects();

    response.status(200).json({
      success: true,
      data: projects,
      message: "Projects retrieved successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function showProject(request, response, next) {
  try {
    const project = await getProjectById(request.params.id);

    if (!project) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "Project not found.",
      });
    }

    return response.status(200).json({
      success: true,
      data: project,
      message: "Project retrieved successfully.",
    });
  } catch (error) {
    return next(error);
  }
}