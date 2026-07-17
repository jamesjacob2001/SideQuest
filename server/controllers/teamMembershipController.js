import { ObjectId } from "mongodb";

import { getProjectById } from "../services/projectService.js";
import {
  createTeamMembership,
  findExistingApplication,
  getApplicantMembershipsWithProjects,
  getProjectMembershipsWithApplicants,
} from "../services/teamMembershipService.js";

export async function addTeamMembership(
  request,
  response,
  next,
) {
  try {
    const { projectId, roleId } = request.body;

    if (!projectId || !roleId) {
      return response.status(400).json({
        success: false,
        data: null,
        message: "Project ID and role ID are required.",
      });
    }

    if (!ObjectId.isValid(projectId)) {
      return response.status(400).json({
        success: false,
        data: null,
        message: "The provided project ID is invalid.",
      });
    }

    const project = await getProjectById(projectId);

    if (!project) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "Project not found.",
      });
    }

    const applicantId = request.user._id;
    const ownerId = project.ownerId;

    if (String(applicantId) === String(ownerId)) {
      return response.status(403).json({
        success: false,
        data: null,
        message: "Project owners cannot apply to their own projects.",
      });
    }

    const selectedRole = project.roles.find(
      (role) => role.roleId === roleId,
    );

    if (!selectedRole) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "The selected project role was not found.",
      });
    }

    const existingApplication = await findExistingApplication(
      projectId,
      applicantId,
    );

    if (existingApplication) {
      return response.status(409).json({
        success: false,
        data: null,
        message: "You have already applied to this project.",
      });
    }

    const currentDate = new Date();

    const membershipDocument = {
      projectId: new ObjectId(projectId),
      applicantId: new ObjectId(applicantId),
      roleId: selectedRole.roleId,
      roleTitle: selectedRole.title,
      status: "pending",
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const createdMembership =
      await createTeamMembership(membershipDocument);

    return response.status(201).json({
      success: true,
      data: createdMembership,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    if (error?.code === 11000) {
      return response.status(409).json({
        success: false,
        data: null,
        message: "You have already applied to this project.",
      });
    }

    return next(error);
  }
}

export async function listMyTeamMemberships(
  request,
  response,
  next,
) {
  try {
    const memberships =
      await getApplicantMembershipsWithProjects(
        request.user._id,
      );

    return response.status(200).json({
      success: true,
      data: {
        memberships,
      },
      message: "Applications retrieved successfully.",
    });
  } catch (error) {
    return next(error);
  }
}

export async function listProjectTeamMemberships(
  request,
  response,
  next,
) {
  try {
    const { projectId } = request.params;

    if (!ObjectId.isValid(projectId)) {
      return response.status(400).json({
        success: false,
        data: null,
        message: "The provided project ID is invalid.",
      });
    }

    const project = await getProjectById(projectId);

    if (!project) {
      return response.status(404).json({
        success: false,
        data: null,
        message: "Project not found.",
      });
    }

    const authenticatedUserId =
      request.user._id.toString();

    const projectOwnerId =
      project.ownerId?.toString?.() ??
      String(project.ownerId);

    if (authenticatedUserId !== projectOwnerId) {
      return response.status(403).json({
        success: false,
        data: null,
        message:
          "Only the project owner can view these applications.",
      });
    }

    const memberships =
      await getProjectMembershipsWithApplicants(
        projectId,
      );

    return response.status(200).json({
      success: true,
      data: {
        project: {
          _id: project._id,
          title: project.title,
        },
        memberships,
      },
      message:
        "Project applications retrieved successfully.",
    });
  } catch (error) {
    return next(error);
  }
}