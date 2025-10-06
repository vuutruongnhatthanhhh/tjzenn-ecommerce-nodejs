// src/routes/blog.routes.ts

import { Router } from "express";
import * as blogController from "@/controllers/blog.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", blogController.getBlogs);
router.get("/latest", blogController.getLatestBlogs);
router.get("/by-url/:url", blogController.getBlogByUrl);
router.get("/by-id/:id", blogController.getBlogById);
router.post("/", authenticate, authorize("ADMIN"), blogController.createBlog);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  blogController.updateBlog
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  blogController.deleteBlog
);

export default router;
