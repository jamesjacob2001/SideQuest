import { Router } from "express";

import { addTeamMembership, listMyTeamMemberships, } from "../controllers/teamMembershipController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/me", requireAuth, listMyTeamMemberships);
router.post("/", requireAuth, addTeamMembership);

export default router;