async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
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

export default apiRequest;
