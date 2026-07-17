import { Router } from "express";


import { addProject, editProject, listProjects, removeProject, showProject, } from "../controllers/projectController.js";
import { listProjectTeamMemberships } from "../controllers/teamMembershipController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireProjectOwner } from "../middleware/requireProjectOwner.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", validateObjectId, showProject);
router.get(
  "/:projectId/team-memberships",
  requireAuth,
  listProjectTeamMemberships,
);
router.post("/", requireAuth, addProject);
router.patch(
  "/:id",
  validateObjectId,
  requireAuth,
  requireProjectOwner,
  editProject,
);
router.delete(
  "/:id",
  validateObjectId,
  requireAuth,
  requireProjectOwner,
  removeProject,
);

export default router;
