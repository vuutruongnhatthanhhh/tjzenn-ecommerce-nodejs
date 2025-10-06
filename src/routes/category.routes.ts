// src/routes/category.route.ts

import { Router } from "express";
import * as categoryController from "@/controllers/category.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  categoryController.createCategory
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  categoryController.deleteCategory
);

export default router;
