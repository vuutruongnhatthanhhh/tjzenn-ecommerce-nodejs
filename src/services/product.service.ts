// src/services/product.service.ts

import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getAllProducts = async (
  query: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
  } = {}
) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const search = query.search || "";
  const categoryId = query.categoryId;

  const where = {
    AND: [
      search
        ? {
            name: {
              contains: search,
            },
          }
        : {},
      categoryId ? { categoryId } : {},
    ],
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductById = (id: number) =>
  prisma.product.findUnique({ where: { id } });

export const getProductByUrl = (url: string) =>
  prisma.product.findUnique({ where: { url } });

export const createProduct = async (data: any) => {
  try {
    return await prisma.product.create({ data });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("product url đã tồn tại");
      (err as any).code = "DUPLICATE_PRODUCT_URL";
      throw err;
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003" // FOREIGN KEY VIOLATION
    ) {
      const err = new Error("categoryId không tồn tại trong Category");
      (err as any).code = "FOREIGN_KEY_VIOLATION";
      throw err;
    }

    throw error;
  }
};

export const updateProduct = async (id: number, data: any) => {
  try {
    const updatedProduct = await prisma.product.update({ where: { id }, data });
    return updatedProduct;
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("product url đã tồn tại");
      (err as any).code = "DUPLICATE_PRODUCT_URL";
      throw err;
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      const err = new Error("categoryId không tồn tại trong Category");
      (err as any).code = "FOREIGN_KEY_VIOLATION";
      throw err;
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id product để update");
      (err as any).code = "PRODUCT_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    return await prisma.product.delete({ where: { id } });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id product để delete");
      (err as any).code = "PRODUCT_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return products;
};
