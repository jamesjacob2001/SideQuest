import { getPublicProjects, getProjectById, createProject, } from "../services/projectService.js";
import { buildProjectDocument } from "../utils/buildProjectDocument.js";
import { validateProject } from "../utils/validators/projectValidator.js";

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

export async function addProject(request, response, next) {
  try {
    const validation = validateProject(request.body);

    if (!validation.isValid) {
      return response.status(400).json({
        success: false,
        data: null,
        message: "Project validation failed.",
        errors: validation.errors,
      });
    }

    // Temporary until Passport authentication is integrated.
    const temporaryOwnerId = "TEMP_OWNER";

    const projectDocument = buildProjectDocument(
      request.body,
      temporaryOwnerId,
    );

    const createdProject = await createProject(projectDocument);

    return response.status(201).json({
      success: true,
      data: createdProject,
      message: "Project created successfully.",
    });
  } catch (error) {
    return next(error);
  }
}