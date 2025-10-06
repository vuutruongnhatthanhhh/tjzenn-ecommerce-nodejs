// src/controllers/blog.controller.ts

import { Request, Response } from "express";
import * as blogService from "@/services/blog.service";
import { z } from "zod";

const createBlogSchema = z
  .object({
    name: z.string().min(1),
    url: z.string().min(1),
    image: z.string().min(1),
    shortDescription: z.string().min(1),
    content: z.string().min(1),
  })
  .strict();

const updateBlogSchema = z
  .object({
    name: z.string().min(1).optional(),
    url: z.string().min(1).optional(),
    image: z.string().min(1),
    shortDescription: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .strict();

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: String(req.query.search || ""),
    };

    const result = await blogService.getAllBlogs(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách blog" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  const blog = await blogService.getBlogById(id);
  if (!blog) return res.status(404).json({ message: "Không tìm thấy id blog" });

  res.json(blog);
};

export const getBlogByUrl = async (req: Request, res: Response) => {
  const url = req.params.url;

  const blog = await blogService.getBlogByUrl(url);
  if (!blog)
    return res.status(404).json({ message: "Không tìm thấy url blog" });

  res.json(blog);
};

export const createBlog = async (req: Request, res: Response) => {
  const parse = createBlogSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json(blog);
  } catch (error: any) {
    if (error.code === "DUPLICATE_BLOG_URL") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi tạo blog",
      error: error.message,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  const parse = updateBlogSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu cập nhật không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const blog = await blogService.updateBlog(id, req.body);
    res.json(blog);
  } catch (error: any) {
    if (error.code === "DUPLICATE_BLOG_URL") {
      return res.status(409).json({ message: error.message });
    }
    if (error.code === "BLOG_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật blog",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  try {
    await blogService.deleteBlog(id);
    res.status(200).json({ message: "Xóa blog thành công" });
  } catch (error: any) {
    if (error.code === "BLOG_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "Lỗi khi delete blog", error: error.message });
  }
};

export const getLatestBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await blogService.getLatestBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy blog mới nhất" });
  }
};
