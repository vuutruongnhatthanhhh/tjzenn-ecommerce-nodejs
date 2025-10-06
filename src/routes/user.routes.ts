// src/routes/user.routes.ts

import { Router } from "express";
import * as userController from "@/controllers/user.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), userController.getUsers);
router.get("/:id", authenticate, authorize("ADMIN"), userController.getUser);
router.post("/", userController.createUser);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  userController.updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  userController.deleteUser
);

export default router;
