// src/controllers/order.controller.ts

import { Request, Response } from "express";
import * as orderService from "@/services/order.service";
import { z } from "zod";

const orderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "shipping",
  "completed",
  "cancelled",
]);

const createOrderSchema = z
  .object({
    customerName: z.string().min(1),
    customerPhone: z.string().min(1),
    customerEmail: z.string().email().optional(),
    address: z.string().min(1),
    note: z.string().optional(),
    status: orderStatusEnum.optional(),
    userId: z.number().nonnegative(),
    items: z
      .array(
        z.object({
          productId: z.number().optional(),
          productName: z.string().min(1),
          productImage: z.string().optional(),
          price: z.number().nonnegative(),
          quantity: z.number().positive(), //>0
        })
      )
      .min(1),
  })
  .strict();

const updateOrderSchema = z
  .object({
    customerName: z.string().min(1).optional(),
    customerPhone: z.string().min(1).optional(),
    customerEmail: z.string().email().optional(),
    address: z.string().min(1).optional(),
    note: z.string().optional(),
    status: orderStatusEnum.optional(),
  })
  .strict();

export const getOrders = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: String(req.query.search || ""),
    };

    const orders = await orderService.getAllOrders(query);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, phải là số" });

  const order = await orderService.getOrderById(id);
  if (!order)
    return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

  res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {
  const parse = createOrderSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    if (error.code === "USER_FOREIGN_KEY_VIOLATION") {
      return res.status(409).json({ message: error.message });
    }
    if (error.code === "PRODUCT_FOREIGN_KEY_VIOLATION") {
      return res.status(409).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, phải là số" });

  const parse = updateOrderSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu cập nhật không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const order = await orderService.updateOrder(id, req.body);
    res.json(order);
  } catch (error: any) {
    if (error.code === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "Lỗi khi cập nhật đơn hàng", error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, phải là số" });

  try {
    await orderService.deleteOrder(id);
    res.status(200).json({ message: "Xoá đơn hàng thành công" });
  } catch (error: any) {
    if (error.code === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "Lỗi khi xoá đơn hàng", error: error.message });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "userId không hợp lệ" });
    }

    const { page, limit, status } = req.query;

    const result = await orderService.getOrdersByUser(userId, {
      page: Number(page),
      limit: Number(limit),
      status: status?.toString(),
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};
