import apiRequest from "./apiClient.js";

const USERS_ENDPOINT = "/api/users";

export async function getUsers() {
  const response = await apiRequest(USERS_ENDPOINT);
  return response.data;
}

export async function getUserById(userId) {
  const response = await apiRequest(`${USERS_ENDPOINT}/${userId}`);
  return response.data;
}

export async function updateUser(userId, userUpdates) {
  const response = await apiRequest(`${USERS_ENDPOINT}/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(userUpdates),
  });

  return response.data;
}

export async function deleteUser(userId) {
  const response = await apiRequest(`${USERS_ENDPOINT}/${userId}`, {
    method: "DELETE",
  });

  return response;
}
