// src/routes/product.routes.ts

import { Router } from "express";
import * as productController from "@/controllers/product.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", productController.getProducts);
router.get("/latest", productController.getLatestProducts);
router.get("/by-url/:url", productController.getProductByUrl);
router.get("/by-id/:id", productController.getProductById);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  productController.createProduct
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct
);

export default router;
