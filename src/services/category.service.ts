// src/services/category.service.ts

import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getAllCategories = async (
  query: {
    page?: number;
    limit?: number;
    search?: string;
  } = {}
) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const where = {
    name: {
      contains: search,
    },
  };

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    data: categories,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getCategoryById = (id: number) => {
  return prisma.category.findUnique({ where: { id } });
};

export const createCategory = async (data: { name: string }) => {
  try {
    return await prisma.category.create({ data });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("name category đã tồn tại");
      (err as any).code = "DUPLICATE_CATEGORY_NAME";
      throw err;
    }
    throw error;
  }
};

export const updateCategory = async (id: number, data: { name: string }) => {
  try {
    return await prisma.category.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id category để update");
      (err as any).code = "CATEGORY_ID_NOT_FOUND";
      throw err;
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("name category đã tồn tại");
      (err as any).code = "DUPLICATE_CATEGORY_NAME";
      throw err;
    }

    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    return await prisma.category.delete({ where: { id } });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id category để delete");
      (err as any).code = "CATEGORY_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};
