# SideQuest Database Schema

SideQuest uses MongoDB and contains three main collections:

- users
- projects
- team_memberships

## Users Collection

The users collection stores account, authentication, and profile information.

A user may:

- create projects
- own projects
- apply to other projects
- have multiple team membership records

## Projects Collection

The projects collection stores projects created by users.

Each project belongs to one owner through its ownerId field.

Project roles are embedded inside each project document.

## Team Memberships Collection

The team_memberships collection stores applications submitted by users who want to join a project.

Each document connects:

- one applicant
- one project
- one project role

Fields:

- _id
- projectId
- applicantId
- roleId
- roleTitle
- status
- createdAt
- updatedAt

Relationships:

- One user can submit many applications.
- One project can receive many applications.
- One user may only have one application per project.

Business Rules:

1. Only authenticated users may apply.
2. Project owners cannot apply to their own projects.
3. Projects must exist.
4. Roles must exist.
5. One application per project per user.
6. Applications begin as pending.
7. Applicants may withdraw pending applications.
8. Only project owners may accept or reject.
9. Only pending applications can be updated.
10. Deleting a user or project removes related memberships.
