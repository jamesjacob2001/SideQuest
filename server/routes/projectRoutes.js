import { Router } from "express";

import { listProjects, showProject, addProject, editProject, } from "../controllers/projectController.js";

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", validateObjectId, showProject);
router.post("/", addProject);
router.patch("/:id", validateObjectId, editProject);

export default router;

