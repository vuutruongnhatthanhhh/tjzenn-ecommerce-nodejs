// src/controllers/category.controller.ts

import { Request, Response } from "express";
import * as categoryService from "@/services/category.service";
import { z } from "zod";

const createCategorySchema = z
  .object({
    name: z.string().min(1, "name category không được để trống"),
  })
  .strict();

const updateCategorySchema = z
  .object({
    name: z.string().min(1, "name category không được để trống").optional(),
  })
  .strict();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: String(req.query.search || ""),
    };
    const result = await categoryService.getAllCategories(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách category" });
  }
};
export const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });

  const category = await categoryService.getCategoryById(id);
  if (!category)
    return res.status(404).json({ message: "Không tìm thấy id category" });

  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const parse = createCategorySchema.safeParse(req.body);
  if (!parse.success)
    return res
      .status(400)
      .json({ message: "Dữ liệu không hợp lệ", errors: parse.error.issues });

  try {
    const created = await categoryService.createCategory(req.body);
    res.status(201).json(created);
  } catch (error: any) {
    if (error.code === "DUPLICATE_CATEGORY_NAME") {
      return res.status(409).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Lỗi khi tạo category", error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });

  const parse = updateCategorySchema.safeParse(req.body);
  if (!parse.success)
    return res
      .status(400)
      .json({ message: "Dữ liệu không hợp lệ", errors: parse.error.issues });

  try {
    const updated = await categoryService.updateCategory(id, req.body);
    res.json(updated);
  } catch (error: any) {
    if (error.code === "CATEGORY_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    if (error.code === "DUPLICATE_CATEGORY_NAME") {
      return res.status(409).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Lỗi khi update category", error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });

  try {
    await categoryService.deleteCategory(id);
    res.status(200).json({ message: "Xoá category thành công" });
  } catch (error: any) {
    if (error.code === "CATEGORY_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Lỗi khi delete category", error: error.message });
  }
};
