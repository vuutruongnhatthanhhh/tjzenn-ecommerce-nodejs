// src/services/order.service.ts

import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getAllOrders = async (
  query: { page?: number; limit?: number; search?: string } = {}
) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const where = search
    ? {
        OR: [
          { customerName: { contains: search } },
          { customerPhone: { contains: search } },
        ],
      }
    : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data: orders,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getOrderById = async (id: number) => {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const createOrder = async (data: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  note?: string;
  status?: string;
  userId: number;
  items: {
    productId?: number;
    productName: string;
    productImage?: string;
    price: number;
    quantity: number;
  }[];
}) => {
  // total price
  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    return await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        address: data.address,
        note: data.note,
        status: data.status ?? "pending",
        total,
        userId: data.userId,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      const message = error.message as string;

      if (message.includes("`userId`")) {
        const err = new Error("userId không tồn tại trong User");
        (err as any).code = "USER_FOREIGN_KEY_VIOLATION";
        throw err;
      }

      if (message.includes("`productId`")) {
        const err = new Error("productId không tồn tại trong Product");
        (err as any).code = "PRODUCT_FOREIGN_KEY_VIOLATION";
        throw err;
      }
    }

    throw error;
  }
};

export const updateOrder = async (
  id: number,
  data: Partial<{
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    address: string;
    note?: string;
    status: string;
  }>
) => {
  try {
    return await prisma.order.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id order để update");
      (err as any).code = "ORDER_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    // delete all OrderItem
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    // delete order
    return await prisma.order.delete({
      where: { id },
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id order để delete");
      (err as any).code = "ORDER_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const getOrdersByUser = async (
  userId: number,
  query: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}
) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const status = query.status;

  const where = {
    AND: [{ userId }, status ? { status } : {}],
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data: orders,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
