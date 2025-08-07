// src/routes/product.routes.ts

import { Router } from "express";
import * as productController from "@/controllers/product.controller";

const router = Router();

router.get("/", productController.getProducts);
router.get("/by-url/:url", productController.getProductByUrl);
router.get("/by-id/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
