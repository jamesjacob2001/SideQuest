import apiRequest from "./apiClient.js";

const PROJECTS_ENDPOINT = "/api/projects";

export async function getProjects() {
  const response = await apiRequest(PROJECTS_ENDPOINT);
  return response.data;
}

export async function getProjectById(projectId) {
  const response = await apiRequest(`${PROJECTS_ENDPOINT}/${projectId}`);
  return response.data;
}

export async function createProject(projectData) {
  const response = await apiRequest(PROJECTS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(projectData),
  });

  return response.data;
}

export async function updateProject(projectId, projectUpdates) {
  const response = await apiRequest(`${PROJECTS_ENDPOINT}/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(projectUpdates),
  });

  return response.data;
}

export async function deleteProject(projectId) {
  const response = await apiRequest(`${PROJECTS_ENDPOINT}/${projectId}`, {
    method: "DELETE",
  });

  return response;
}
