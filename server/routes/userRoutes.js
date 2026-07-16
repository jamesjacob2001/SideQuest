import { Router } from "express";

import {
  listPublicUsers,
  showUser,
} from "../controllers/userController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", listPublicUsers);
router.get("/:id", validateObjectId, showUser);

export default router;
