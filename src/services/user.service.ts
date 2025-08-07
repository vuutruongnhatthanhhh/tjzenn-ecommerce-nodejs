import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "@/utils/hash";

export const userSelectFields = {
  id: true,
  username: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export const getAllUsers = async (
  query: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  } = {}
) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const search = query.search || "";
  const roleFilter = query.role || undefined;

  const where = {
    AND: [
      search
        ? {
            OR: [
              { username: { contains: search } },
              { name: { contains: search } },
            ],
          }
        : {},
      roleFilter ? { role: roleFilter } : {},
    ],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: userSelectFields,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getUserById = (id: number) =>
  prisma.user.findUnique({
    where: { id },
    select: userSelectFields,
  });

export const createUser = async (data: any) => {
  const hashedPassword = await hashPassword(data.password);

  try {
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: userSelectFields,
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002" //P2002 is error duplicate @unique in prisma
    ) {
      const err = new Error("username đã tồn tại");
      (err as any).code = "DUPLICATE_USERNAME";
      throw err;
    }

    throw error;
  }
};

export const updateUser = async (id: number, data: any) => {
  const updateData = { ...data };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: userSelectFields,
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id user để update");
      (err as any).code = "USER_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      const err = new Error("Không tìm thấy id user để delete");
      (err as any).code = "USER_ID_NOT_FOUND";
      throw err;
    }

    throw error;
  }
};
