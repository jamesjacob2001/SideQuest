# SideQuest Project Schema

This document defines the planned MongoDB document structures and validation rules for the SideQuest application.

It serves as the source of truth for the frontend forms, backend validation, API implementation, and MongoDB collections.

## Projects Collection

Each document in the `projects` collection represents one side project created by a user.

Each project has:

- One owner
- One or more project categories
- One or more technologies
- One or more project roles
- Zero or more accepted team members
- Structured project-description sections
- Searchable project metadata
- A manually managed project status

Project team capacity is calculated from the total number of positions across all roles. A separate `teamSize` field is not stored.

## Project Document

| Field              | Type                  | Required    | Description                                                   |
| ------------------ | --------------------- | ----------- | ------------------------------------------------------------- |
| `_id`              | ObjectId              | Yes         | MongoDB-generated project identifier                          |
| `ownerId`          | ObjectId              | Yes         | ID of the user who owns and manages the project               |
| `title`            | String                | Yes         | Project title                                                 |
| `tagline`          | String                | Yes         | Short, one-sentence project summary                           |
| `description`      | Object                | Yes         | Structured project-description sections                       |
| `categories`       | Array of strings      | Yes         | One or more approved project categories                       |
| `customCategories` | Array of strings      | Conditional | User-defined categories entered when `Other` is selected      |
| `technologies`     | Array of strings      | Yes         | Predefined or custom technologies associated with the project |
| `roles`            | Array of role objects | Yes         | Roles available within the project                            |
| `experienceLevel`  | String                | No          | General suggested contributor experience level                |
| `locationType`     | String                | Yes         | `Remote`, `Hybrid`, or `In Person`                            |
| `location`         | String                | No          | Physical or geographic location when relevant                 |
| `weeklyCommitment` | String                | No          | Estimated weekly time commitment                              |
| `duration`         | String                | No          | Estimated project duration                                    |
| `compensation`     | Object                | No          | Optional compensation information                             |
| `status`           | String                | Yes         | `Recruiting`, `Active`, `Paused`, or `Completed`              |
| `createdAt`        | Date                  | Yes         | Date and time the project was created                         |

## Description Object

The `description` field is divided into structured sections instead of one large block of text.

| Field             | Type   | Required | Description                                             |
| ----------------- | ------ | -------- | ------------------------------------------------------- |
| `overview`        | String | Yes      | General explanation of the project                      |
| `goals`           | String | Yes      | Main objectives or intended outcomes                    |
| `currentProgress` | String | Yes      | Current state of development                            |
| `lookingFor`      | String | Yes      | General explanation of the help or collaborators needed |

## Role Object

Roles are embedded inside the associated project document for Project 3.

| Field             | Type             | Required | Description                                      |
| ----------------- | ---------------- | -------- | ------------------------------------------------ |
| `roleId`          | String           | Yes      | Identifier unique within the project             |
| `title`           | String           | Yes      | Name of the role                                 |
| `description`     | String           | No       | Short explanation of the role’s responsibilities |
| `requiredSkills`  | Array of strings | Yes      | Skills relevant to the role                      |
| `experienceLevel` | String           | Yes      | Suggested experience level for the role          |
| `totalPositions`  | Integer          | Yes      | Total number of people who may occupy the role   |

The number of filled positions is not stored inside the role. It is calculated by counting accepted `team_memberships` documents associated with the project and `roleId`.

## Compensation Object

The `compensation` field is optional because many projects will be unpaid, portfolio-based, or still determining compensation.

| Field      | Type   | Required               | Description                                                                         |
| ---------- | ------ | ---------------------- | ----------------------------------------------------------------------------------- |
| `type`     | String | Yes when object exists | Compensation type, such as unpaid, hourly, fixed amount, equity, or to be discussed |
| `amount`   | Number | No                     | Optional compensation amount                                                        |
| `currency` | String | No                     | Currency associated with the amount, such as `USD`                                  |

SideQuest will display compensation information but will not process payments.

## Project Business Rules

- Any authenticated user may create a project.
- Project titles do not need to be unique.
- Every project must contain at least one category.
- A project may contain multiple categories.
- Selecting `Other` requires at least one custom category.
- Custom categories do not automatically become approved default categories.
- Every project must contain at least one technology.
- Custom technologies may be stored on a project but do not automatically become approved default technologies.
- Technology comparisons should be case-insensitive.
- Every project must contain at least one role.
- Every role must contain at least one position.
- Every role must have a unique `roleId` within its project.
- Multiple roles may require the same skill.
- Team capacity is calculated from the sum of all role positions.
- A separate `teamSize` field is not stored.
- The project owner may occupy one of the listed project roles.
- One user may occupy only one role per project during Project 3.
- A user may have only one pending request per project. Each pending request targets one role.
- A role cannot be deleted while accepted members occupy it.
- A role’s `totalPositions` cannot be reduced below its accepted-member count.
- Recruiting automatically closes when every role position is filled.
- Project status is otherwise selected manually by the project owner.
- Projects are public by default.
- Unauthenticated users may browse public projects.
- Only authenticated users may access the Create Project page.
- Paused projects remain visible in public project results.
- Completed projects are removed from public project results.
- Completed projects may still appear on user profiles.
- Project owners may not freely change structural information in ways that conflict with accepted team memberships.
- Deleting a project permanently deletes its associated team-membership documents.
- Project deletion requires user confirmation.

## Team Memberships Collection

Each document in the `team_memberships` collection represents one user’s relationship to one project.

This collection supports:

- Project ownership
- Join requests
- Accepted team members
- Role assignments
- Former members
- Completed-project profile visibility

A user may have only one team-membership document per project.

## Team Membership Document

| Field               | Type           | Required    | Description                                             |
| ------------------- | -------------- | ----------- | ------------------------------------------------------- |
| `_id`               | ObjectId       | Yes         | MongoDB-generated membership identifier                 |
| `projectId`         | ObjectId       | Yes         | ID of the associated project                            |
| `userId`            | ObjectId       | Yes         | ID of the associated user                               |
| `membershipType`    | String         | Yes         | `Owner` or `Member`                                     |
| `roleId`            | String or null | Conditional | ID of the assigned project role                         |
| `roleTitle`         | String or null | Conditional | Display name of the assigned role                       |
| `requestMessage`    | String         | No          | Message submitted when requesting to join a role        |
| `status`            | String         | Yes         | `Pending`, `Accepted`, `Declined`, `Left`, or `Removed` |
| `profileVisibility` | String         | Yes         | `Public` or `Private`                                   |
| `createdAt`         | Date           | Yes         | Date the membership or request was created              |
| `joinedAt`          | Date or null   | No          | Date the request was accepted                           |
| `leftAt`            | Date or null   | No          | Date the user left or was removed                       |

## Team Membership Business Rules

- One user may have only one team-membership document per project.
- Every project owner must have an accepted team-membership document.
- Ownership permission is determined by the project’s `ownerId` and the membership’s `membershipType`.
- An owner may act only as an organizer and have no assigned `roleId`.
- An owner may instead occupy one of the project’s listed roles.
- The owner should not receive separate owner and contributor membership documents.
- A regular member must be associated with a valid project role.
- New join requests begin with a `Pending` status.
- Only the project owner may accept or decline a pending request.
- Accepted memberships count toward the associated role’s filled positions.
- A user may have multiple pending role requests only if the implementation stores the requested role choices within the same membership workflow.
- Once a user is accepted into one role, other pending requests for that project must be withdrawn or declined.
- Members may leave active projects.
- When a member leaves, their role position becomes available again.
- Members cannot remove themselves from completed-project history.
- Users may mark completed projects as private on their profiles.
- Owners may not leave their own project during Project 3.
- Deleting a project permanently deletes all team-membership documents associated with it.

## Approved Project Categories

The initial approved categories are defined in `server/constants/categories.js`.

Current categories include:

- Web Development
- Mobile Development
- AI / Machine Learning
- Data Science
- Game Development
- Research
- Robotics
- Open Source
- Entrepreneurship
- Design
- Creative
- Other

## Approved Experience Levels

The approved experience levels are defined in `server/constants/experienceLevels.js`.

- Open to All Levels
- Beginner Friendly
- Intermediate
- Advanced

## Approved Location Types

The approved location types are defined in `server/constants/locationTypes.js`.

- Remote
- Hybrid
- In Person

## Approved Project Statuses

The approved project statuses are defined in `server/constants/projectStatuses.js`.

- Recruiting
- Active
- Paused
- Completed

`Full` is not stored as a project status. Whether a project is full is calculated from accepted team memberships and available role positions.
