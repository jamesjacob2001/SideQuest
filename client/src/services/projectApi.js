const PROJECTS_ENDPOINT = "/api/projects";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let responseBody;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const error = new Error(
      responseBody?.message || "The API request failed.",
    );

    error.status = response.status;
    error.details = responseBody?.errors ?? [];

    throw error;
  }

  return responseBody;
}

export async function getProjects(page = 1, limit = 24) {
  const searchParameters = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await apiRequest(
    `${PROJECTS_ENDPOINT}?${searchParameters.toString()}`,
  );

  return response.data;
}

export async function getProjectById(projectId) {
  const response = await apiRequest(
    `${PROJECTS_ENDPOINT}/${projectId}`,
  );

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
  const response = await apiRequest(
    `${PROJECTS_ENDPOINT}/${projectId}`,
    {
      method: "PATCH",
      body: JSON.stringify(projectUpdates),
    },
  );

  return response.data;
}

export async function deleteProject(projectId) {
  const response = await apiRequest(
    `${PROJECTS_ENDPOINT}/${projectId}`,
    {
      method: "DELETE",
    },
  );

  return response;
}