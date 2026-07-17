import apiRequest from "./apiClient.js";

const DASHBOARD_ENDPOINT = "/api/dashboard";

export async function getDashboard() {
  const response = await apiRequest(DASHBOARD_ENDPOINT);
  return response.data;
}
