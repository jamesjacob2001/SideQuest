import { Router } from "express";

import {
  editUser,
  listPublicUsers,
  removeUser,
  showUser,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireSelf } from "../middleware/requireSelf.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listPublicUsers);
router.get("/:id", validateObjectId, showUser);
router.patch("/:id", validateObjectId, requireAuth, requireSelf, editUser);
router.delete("/:id", validateObjectId, requireAuth, requireSelf, removeUser);

export default router;
