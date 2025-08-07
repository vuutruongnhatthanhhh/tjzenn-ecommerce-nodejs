// src/routes/blog.routes.ts

import { Router } from "express";
import * as blogController from "@/controllers/blog.controller";

const router = Router();

router.get("/", blogController.getBlogs);
router.get("/by-url/:url", blogController.getBlogByUrl);
router.get("/by-id/:id", blogController.getBlogById);
router.post("/", blogController.createBlog);
router.patch("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;
