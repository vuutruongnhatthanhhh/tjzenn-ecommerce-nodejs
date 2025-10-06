// src/routes/order.routes.ts

import { Router } from "express";
import * as orderController from "@/controllers/order.controller";
import { authenticate, authorize } from "@/utils/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), orderController.getOrders);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  orderController.getOrderById
);
router.get("/user/:userId", authenticate, orderController.getOrdersByUser);
router.post("/", authenticate, orderController.createOrder);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  orderController.updateOrder
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  orderController.deleteOrder
);

export default router;
