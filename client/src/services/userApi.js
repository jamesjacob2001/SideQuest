const USERS_ENDPOINT = "/api/users";

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
