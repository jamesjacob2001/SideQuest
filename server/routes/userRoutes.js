import { Router } from "express";

import {
  editUser,
  listPublicUsers,
  removeUser,
  showUser,
} from "../controllers/userController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listPublicUsers);
router.get("/:id", validateObjectId, showUser);

// Temporary: no requireAuth / ownership checks until Passport is integrated.
router.patch("/:id", validateObjectId, editUser);
router.delete("/:id", validateObjectId, removeUser);

export default router;
