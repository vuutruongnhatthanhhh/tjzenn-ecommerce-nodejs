import * as userService from "@/services/user.service";
import { Request, Response } from "express";
import { z } from "zod";

const createUserSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(["USER"]),
    email: z.string().min(1).optional(),
    phone: z.string().min(10).optional(),
    address: z.string().min(1).optional(),
  })
  .strict(); // Tự động bỏ field lạ (createdAt, updatedAt)

const updateUserSchema = z
  .object({
    name: z.string().min(1).optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  })
  .strict(); // loại bỏ mọi field lạ như username, createdAt, etc.

export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, search, role } = req.query;

  const users = await userService.getAllUsers({
    page: Number(page),
    limit: Number(limit),
    search: typeof search === "string" ? search : undefined,
    role: typeof role === "string" ? role : undefined,
  });

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }
  const user = await userService.getUserById(id);
  if (!user)
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const parse = createUserSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "DUPLICATE_USERNAME") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi tạo người dùng",
      error: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  const parse = updateUserSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      message: "Dữ liệu cập nhật không hợp lệ",
      errors: parse.error.issues,
    });
  }

  try {
    const updatedUser = await userService.updateUser(id, parse.data);
    res.json(updatedUser);
  } catch (error: any) {
    if (error.code === "USER_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Lỗi khi update user", error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID không hợp lệ, ID phải là số" });
  }

  try {
    await userService.deleteUser(id);
    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error: any) {
    if (error.code === "USER_ID_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Lỗi khi delete user", error: error.message });
  }
};
