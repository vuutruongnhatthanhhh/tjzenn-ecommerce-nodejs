// src/controllers/auth.controller.ts

import * as authService from "@/services/auth.service";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.loginUser(username, password);
    return res.json(result);
  } catch (err: any) {
    return res
      .status(400)
      .json({ message: err.message || "Đăng nhập thất bại" });
  }
};
