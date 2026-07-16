import { Router } from "express";

import { listProjects, showProject, } from "../controllers/projectController.js";

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", validateObjectId, showProject);

export default router;

