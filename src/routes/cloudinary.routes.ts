import express from "express";
import {
  uploadImage,
  deleteImageByUrl,
  getAllImages,
} from "@/controllers/cloudinary.controller";
import upload from "@/middlewares/cloudinaryStorage";
import { authenticate, authorize } from "@/utils/authMiddleware";
const router = express.Router();

router.get("/images", authenticate, authorize("ADMIN"), getAllImages);
router.post(
  "/upload",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  uploadImage
);
router.delete("/delete", authenticate, authorize("ADMIN"), deleteImageByUrl);

export default router;
