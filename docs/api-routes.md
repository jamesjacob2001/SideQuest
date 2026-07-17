# SideQuest Team Membership API

All routes require authentication unless otherwise noted.

---

## Create Application

POST /api/team-memberships

Request Body:

- projectId
- roleId

Returns:

- 201 Created
- Newly created membership

Errors:

- 400 Invalid request
- 401 Not logged in
- 403 Cannot apply to own project
- 404 Project or role not found
- 409 Already applied

---

## Get My Applications

GET /api/team-memberships/me

Returns:

- all applications submitted by the logged-in user

---

## Get One Membership

GET /api/team-memberships/:membershipId

Returns:

- one membership record

Accessible only by:

- applicant
- project owner

---

## Get Applications For A Project

GET /api/projects/:projectId/team-memberships

Returns:

- every application submitted to the project

Accessible only by the project owner.

---

## Accept / Reject Application

PATCH /api/team-memberships/:membershipId/status

Request Body:

status

Allowed values:

- accepted
- rejected

Only the project owner may perform this action.

---

## Withdraw Application

DELETE /api/team-memberships/:membershipId

Allows the applicant to withdraw a pending application.

Accepted and rejected applications cannot be withdrawn.

---

## Authorization Summary

Applicant:

- Apply
- View own applications
- Withdraw pending application

Project Owner:

- View project applications
- Accept applications
- Reject applications

Other Users:

- No access
