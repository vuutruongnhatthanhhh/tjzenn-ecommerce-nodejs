// src/routes/cloudinary.routes.ts

import express from "express";
import {
  uploadImage,
  deleteImageByUrl,
  getAllImages,
} from "@/controllers/cloudinary.controller";
import upload from "@/middlewares/cloudinaryStorage";
const router = express.Router();

router.get("/images", getAllImages);
router.post("/upload", upload.single("image"), uploadImage);
router.delete("/delete", deleteImageByUrl);

export default router;
