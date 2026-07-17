import { Router } from "express";

import { addTeamMembership, listMyTeamMemberships, updateMembershipStatus, withdrawMembership, } from "../controllers/teamMembershipController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/me", requireAuth, listMyTeamMemberships);
router.post("/", requireAuth, addTeamMembership);
router.patch("/:membershipId/status", requireAuth, updateMembershipStatus,);
router.delete("/:membershipId", requireAuth, withdrawMembership,);

export default router;