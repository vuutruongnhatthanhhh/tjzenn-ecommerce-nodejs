// src/services/auth.service.ts

import prisma from "@/config/db";
import { signToken } from "@/utils/jwt";
import { comparePassword } from "@/utils/hash";

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("Username không tồn tại");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Sai mật khẩu");
  }

  const token = signToken({ userId: user.id, role: user.role });

  return {
    message: "Đăng nhập thành công",
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
  };
};
