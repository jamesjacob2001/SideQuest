import apiRequest from "./apiClient.js";

const AUTH_ENDPOINT = "/api/auth";

export async function registerUser(userData) {
  const response = await apiRequest(`${AUTH_ENDPOINT}/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response.data;
}

export async function loginUser(credentials) {
  const response = await apiRequest(`${AUTH_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export async function logoutUser() {
  const response = await apiRequest(`${AUTH_ENDPOINT}/logout`, {
    method: "POST",
  });

  return response;
}

export async function getCurrentUser() {
  try {
    const response = await apiRequest(`${AUTH_ENDPOINT}/me`);
    return response.data;
  } catch (error) {
    if (error.status === 401) {
      return null;
    }

    throw error;
  }
}
