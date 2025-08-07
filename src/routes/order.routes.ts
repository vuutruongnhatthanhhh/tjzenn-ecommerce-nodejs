// src/routes/order.routes.ts

import { Router } from "express";
import * as orderController from "@/controllers/order.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.get(
  "/user/:userId",
  authenticate,
  authorize("ADMIN"),
  orderController.getOrdersByUser
);
router.post("/", authenticate, orderController.createOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
