// src/controllers/product.controller.ts

import { Request, Response } from "express";
import * as productService from "@/services/product.service";
import { z } from "zod";

const createProductSchema = z
  .object({
    name: z.string().min(1),
    url: z.string().min(1),
    shortDescription: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    price: z.number().nonnegative(),
    categoryId: z.number().nonnegative().optional(),
  })
  .strict();

const updateProductSchema = z
  .object({
    name: z.string().min(1).optional(),
    url: z.string().min(1).optional(),
    shortDescription: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    categoryId: z.number().nonnegative().optional(),
  })
  .strict();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: String(req.query.search || ""),
      categoryId: req.query.categoryId
        ? Number(req.query.categoryId)
        : undefined,
    };

    const result = await productService.getAllProducts(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }
  const product = await productService.getProductById(id);
  if (!product)
    return res.status(404).json({ message: "Không tìm thấy id product " });
  res.json(product);
};

export const getProductByUrl = async (req: Request, res: Response) => {
  const url = req.params.url;
  const product = await productService.getProductByUrl(url);
  if (!product)
    return res.status(404).json({ message: "Không tìm thấy url product" });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const parse = createProductSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: parse.error.issues,
    });
  }
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    if (error.code === "DUPLICATE_PRODUCT_URL") {
      return res.status(409).json({ message: error.message });
    }
    if (error.code === "FOREIGN_KEY_VIOLATION") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi tạo product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  const parse = updateProductSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu cập nhật không hợp lệ",
      errors: parse.error.issues,
    });
  }
  try {
    const product = await productService.updateProduct(id, req.body);
    res.json(product);
  } catch (error: any) {
    if (error.code === "DUPLICATE_PRODUCT_URL") {
      return res.status(409).json({ message: error.message });
    }
    if (error.code === "FOREIGN_KEY_VIOLATION") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === "PRODUCT_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật sản phẩm",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }
  try {
    await productService.deleteProduct(id);
    res.status(200).json({ message: "Xóa product thành công" });
  } catch (error: any) {
    if (error.code === "PRODUCT_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Lỗi khi delete product", error: error.message });
  }
};
