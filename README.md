# Project Structure

This document provides an overview of how the SideQuest repository is organized and the intended purpose of each directory. The goal is to keep the project modular, easy to navigate, and scalable as we continue to iterate throughout the semester. **Not every file or folder will be populated immediately**—many will be created as features are implemented.

---

# Running Locally

## Prerequisites

- Node.js and npm
- A MongoDB Atlas cluster (or connection string from a teammate)
- Your IP address allowed under Atlas **Network Access** (or `0.0.0.0/0` for development)

## 1. Install dependencies

From the project root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

## 2. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=sidequest_db
PORT=3000
SESSION_SECRET=replace-with-a-long-random-string
```

Never commit `.env`. Do not put real Mongo credentials in this README.

If Atlas Network Access does not allow your IP, the server will fail to start with a TLS/SSL connection error.

### Seeded user login (demo)

Imported seed users use bcrypt password hashes. After importing `data/users.json`, run once:

```bash
node database/seed/rehashUserPasswords.js
```

Then you can log in with any seeded user's email and password:

```text
Password123!
```

## 3. Start the app

From the project root:

```bash
npm run dev
```

This starts the Express API and the Vite React client together.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Health check | http://localhost:3000/api/health |
| Database health | http://localhost:3000/api/health/database |

### Run client or server alone

```bash
npm run client
npm run server
```

---

# Repository Overview

```text
sidequest/
├── client/
├── server/
├── database/
├── docs/
├── .env.example
├── .gitignore
├── eslint.config.js
├── prettier.config.js
├── LICENSE
├── README.md
└── package.json
```

## Root Directory

The root of the project contains project-wide configuration and documentation.

| File | Purpose |
|------|---------|
| `package.json` | Root scripts for running both the frontend and backend simultaneously. |
| `.env.example` | Template showing required environment variables (never commit `.env`). |
| `.gitignore` | Files and folders excluded from Git. |
| `eslint.config.js` | Shared ESLint configuration. |
| `prettier.config.js` | Shared code formatting configuration. |
| `README.md` | Main project documentation. |
| `LICENSE` | MIT License. |

---

# Client

The `client` folder contains the React frontend created with **Vite**.

```text
client/
├── public/
├── src/
├── package.json
└── vite.config.js
```

---

## public/

Contains static files served directly by Vite.

Examples:

- favicon
- logos
- static images

---

## src/

Contains all React source code.

---

# assets/

Stores static assets imported by React.

Examples:

- icons
- project logos
- images

---

# components/

Reusable UI components that can be shared across multiple features.

Examples:

- Navbar
- Footer
- Loading Spinner
- Status Badge
- Skill Tag

These components should **not** contain application logic.

---

# features/

The majority of our application will live here.

Each feature is responsible for one area of the application.

Current planned features:

```text
features/
    auth/
    profiles/
    projects/
    teamMemberships/
    dashboard/
```

---

## auth/

Responsible for authentication.

Expected responsibilities:

- Login
- Registration
- Logout
- Authentication Context
- Protected Routes
- Authentication API requests

---

## profiles/

Responsible for user profiles.

Expected responsibilities:

- View profile
- Edit profile
- Skills
- Interests
- Availability
- Portfolio links
- GitHub links

---

## projects/

Responsible for project management.

Expected responsibilities:

- Create projects
- Edit projects
- Delete projects
- Browse projects
- Search projects
- Filter projects
- View project details
- Manage project roles

This will likely become the largest feature in the project.

---

## teamMemberships/

Responsible for managing relationships between users and projects.

Examples:

- Join requests
- Pending requests
- Accepted members
- Leaving projects
- Team roster
- Completed project visibility

The MongoDB collection will also be named:

```text
team_memberships
```

Each document represents **one user's relationship to one project**.

---

## dashboard/

Responsible for displaying information relevant to the logged-in user.

Examples:

- Projects I Own
- Projects I've Joined
- Pending Requests
- Recruiting Projects

The dashboard will pull information from multiple collections.

---

# pages/

Top-level pages rendered by React Router.

Examples:

```text
Landing Page

Projects

Project Details

Create Project

Dashboard

Profile

Login

Register
```

Pages should primarily compose existing components rather than contain large amounts of business logic.

---

# services/

Contains API functions that communicate with the Express backend using Fetch.

Examples:

```js
getProjects()

createProject()

updateProfile()
```

Keeping API calls separate prevents components from becoming cluttered.

---

# styles/

Contains global styling.

Examples:

- global.css
- typography.css
- CSS variables

Feature-specific styling should remain beside its component using CSS Modules.

---

# utils/

Shared helper functions.

Examples:

- formatting dates
- validation
- skill normalization
- constants

---

# App.jsx

Top-level React component.

Responsible for:

- Rendering routes
- Global layout

---

# main.jsx

React application entry point.

Responsible for:

- Rendering React into the DOM
- Loading global CSS

---

# Server

The `server` folder contains the Express backend.

```text
server/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
└── package.json
```

---

# config/

Configuration files.

Examples:

- MongoDB connection
- Passport configuration
- Session configuration

---

# controllers/

Controllers receive requests from Express routes and coordinate application logic.

Example:

```text
GET /projects

↓

projectController.getProjects()

↓

projectService.getProjects()

↓

MongoDB
```

Controllers should remain relatively lightweight.

---

# middleware/

Reusable Express middleware.

Examples:

- Authentication
- Project ownership validation
- Error handling
- ObjectId validation

---

# routes/

Defines API endpoints.

Examples:

```text
/auth

/users

/projects

/teamMemberships
```

Routes should primarily map URLs to controller functions.

---

# services/

Contains business logic and database operations.

Examples:

- Query MongoDB
- Create users
- Update projects
- Accept join requests

Services help keep controllers clean.

---

# utils/

Helper functions shared across the backend.

Examples:

- Normalize skills
- Remove sensitive user information
- Formatting helpers

---

# app.js

Creates and configures the Express application.

Responsibilities include:

- Middleware
- Sessions
- Passport
- Route registration

---

# server.js

Starts the Express server.

Responsibilities:

- Connect to MongoDB
- Start listening on the configured port

---

# Database

```text
database/
├── seed/
└── createIndexes.js
```

---

## seed/

Contains scripts for generating synthetic data.

Examples:

- Users
- Projects
- Team memberships

Eventually these scripts will generate the 1,000+ records required by the project rubric.

---

## createIndexes.js

Stores MongoDB index creation scripts to improve query performance.

---

# Docs

```text
docs/
├── project-proposal.md
├── api-routes.md
├── database-schema.md
└── mockups/
```

Contains planning documents.

Examples:

- Proposal
- API documentation
- Database schemas
- UI mockups

---

# MongoDB Collections

The application currently plans to use **three collections**.

## users

Stores user accounts and profile information.

---

## projects

Stores project listings, project metadata, and available project roles.

---

## team_memberships

Stores each user's relationship to a project.

Possible statuses include:

- pending
- accepted
- declined
- left
- removed

This design allows us to represent both join requests and active team members using a single collection.

---

# General Development Philosophy

- Build features incrementally—do not create files until they are needed.
- Keep React components small and focused on one responsibility.
- Separate UI, business logic, and database operations whenever possible.
- Favor reusable components over duplicated code.
- Organize code by feature on the frontend and by responsibility on the backend.
- Use meaningful commit messages and work on feature branches before merging into `main`.