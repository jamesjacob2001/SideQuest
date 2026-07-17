import apiRequest from "./apiClient.js";

const MEMBERSHIPS_ENDPOINT = "/api/team-memberships";

export async function updateMembershipStatus(membershipId, status) {
  const response = await apiRequest(
    `${MEMBERSHIPS_ENDPOINT}/${membershipId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );

  return response.data;
}
