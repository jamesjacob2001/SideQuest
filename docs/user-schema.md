# SideQuest User Schema

This document defines the MongoDB document structure for the `users` collection.

It is the source of truth for profile APIs, validation, and seed data shape.

## Users Collection

Each document in the `users` collection represents one SideQuest account and profile.

## User Document

| Field             | Type             | Required | Description                                                  |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------ |
| `_id`             | ObjectId         | Yes      | MongoDB-generated user identifier                            |
| `userId`          | String           | No       | Optional legacy UUID from seed data; APIs use `_id`          |
| `username`        | String           | Yes      | Unique username                                              |
| `name`            | String           | Yes      | Display name                                                 |
| `email`           | String           | Yes      | Unique email address used for login                          |
| `passwordHash`    | String           | Yes      | bcrypt hash of the password (never returned by the API)      |
| `university`      | String           | No       | School or university                                         |
| `major`           | String           | No       | Academic major                                               |
| `graduationYear`  | Number           | No       | Expected graduation year                                     |
| `yearLabel`       | String           | No       | Class standing label                                         |
| `bio`             | String           | No       | Short profile biography                                      |
| `technicalSkills` | Array of strings | No       | Skills of any kind (design, research, writing, coding, etc.) |
| `interests`       | Array of strings | No       | Project topics or domains of interest across categories      |
| `rolePreferences` | Array of strings | No       | Preferred collaboration roles on any project type            |
| `experienceLevel` | String           | No       | `Beginner`, `Intermediate`, or `Advanced`                    |
| `availability`    | String           | No       | Weekly availability band                                     |
| `portfolioLinks`  | Object           | No       | External profile links                                       |
| `profileImageUrl` | String           | No       | Profile image URL                                            |
| `location`        | String           | No       | City or region                                               |
| `projectsOwned`   | Array            | No       | Legacy/denormalized; not source of truth                     |
| `projectsJoined`  | Array            | No       | Legacy/denormalized; not source of truth                     |
| `isRecruiting`    | Boolean          | No       | Whether the user is looking for projects                     |
| `createdAt`       | Date or string   | Yes      | Account creation timestamp                                   |
| `updatedAt`       | Date or string   | Yes      | Last profile update timestamp                                |

## Portfolio Links Object

| Field          | Type   | Required | Description          |
| -------------- | ------ | -------- | -------------------- |
| `github`       | String | No       | GitHub profile URL   |
| `linkedin`     | String | No       | LinkedIn profile URL |
| `personalSite` | String | No       | Personal website URL |

## Approved Year Labels

- First-year
- Sophomore
- Junior
- Senior
- Graduate student

## Approved User Experience Levels

- Beginner
- Intermediate
- Advanced

## Approved Availability Values

- 1-3 hrs/week
- 4-6 hrs/week
- 7-10 hrs/week
- 11-15 hrs/week
- 15+ hrs/week

## Business Rules

- Email and username must be unique.
- `passwordHash` must never be included in API responses.
- Public profile reads may return sanitized user documents without authentication.
- Profile updates and account deletion require authentication and ownership (Phase 2).
- Project ownership and membership are tracked via `projects.ownerId` and `team_memberships`, not via `projectsOwned` / `projectsJoined`.
