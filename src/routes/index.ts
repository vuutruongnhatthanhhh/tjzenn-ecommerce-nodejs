// src/routes/index.ts

import { Router } from "express";
import userRoutes from "@/routes/user.routes";
import categoryRoutes from "@/routes/category.routes";
import productRoutes from "@/routes/product.routes";
import blogRoutes from "@/routes/blog.routes";
import orderRoutes from "@/routes/order.routes";
import authRoutes from "@/routes/auth.routes";
import cloudinaryRoutes from "@/routes/cloudinary.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/orders", orderRoutes);
router.use("/cloudinary", cloudinaryRoutes);

export default router;
