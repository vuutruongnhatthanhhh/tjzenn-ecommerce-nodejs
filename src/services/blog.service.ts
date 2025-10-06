// src/services/blog.service.ts

import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getAllBlogs = async (
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

  const where = search
    ? {
        name: {
          contains: search,
        },
      }
    : {};

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.count({ where }),
  ]);

  return {
    data: blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getBlogById = (id: number) =>
  prisma.blog.findUnique({ where: { id } });

export const getBlogByUrl = (url: string) =>
  prisma.blog.findUnique({ where: { url } });

export const createBlog = async (data: any) => {
  try {
    return await prisma.blog.create({ data });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("blog url đã tồn tại");
      (err as any).code = "DUPLICATE_BLOG_URL";
      throw err;
    }

    throw error;
  }
};

export const updateBlog = async (id: number, data: any) => {
  try {
    const updatedBlog = await prisma.blog.update({ where: { id }, data });
    return updatedBlog;
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("blog url đã tồn tại");
      (err as any).code = "DUPLICATE_BLOG_URL";
      throw err;
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id blog để update");
      (err as any).code = "BLOG_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const deleteBlog = async (id: number) => {
  try {
    return await prisma.blog.delete({ where: { id } });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id blog để delete");
      (err as any).code = "BLOG_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const getLatestBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return blogs;
};
