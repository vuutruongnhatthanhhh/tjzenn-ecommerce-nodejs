// src/controllers/cloudinary.controller.ts

import { Request, Response } from "express";
import prisma from "@/config/db";
import cloudinary from "@/utils/cloudinary";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: "Không có ảnh được tải lên" });
    }

    const category = req.query.folder || "default";
    const name = file.originalname.split(".")[0];
    const url = file.path;

    // Insert DB
    const newImage = await prisma.image.create({
      data: {
        name,
        url,
        category: category.toString(),
      },
    });

    return res.json({
      message: "Upload cloudinary và lưu DB thành công",
      image: newImage,
    });
  } catch (err) {
    console.error("[Upload Error]", err);
    return res.status(500).json({ message: "Lỗi khi upload ảnh" });
  }
};

export const deleteImageByUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Thiếu URL ảnh cần xoá" });
  }

  try {
    // get image by url
    const image = await prisma.image.findUnique({
      where: { url },
    });

    if (!image) {
      return res.status(404).json({ message: "Không tìm thấy ảnh trong DB" });
    }

    const category = image.category || "default";
    const parts = url.split("/");
    const filenameWithExt = parts[parts.length - 1]; // abc.webp
    const public_id = filenameWithExt.split(".")[0]; // abc

    // delete image in cloudinary
    await cloudinary.uploader.destroy(`${category}/${public_id}`);
    // delete in db
    await prisma.image.delete({
      where: { url },
    });

    res.json({ message: "Xoá ảnh thành công!" });
  } catch (error) {
    console.error("[Delete Image Error]", error);
    res.status(500).json({ message: "Lỗi server khi xoá ảnh" });
  }
};

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const search = (req.query.search as string) || "";
    const category = (req.query.category as string) || "";

    const where = {
      ...(search && {
        name: {
          contains: search,
        },
      }),
      ...(category && { category }),
    };

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.image.count({ where }),
    ]);

    return res.json({
      data: images,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[Get All Images Error]", error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách ảnh" });
  }
};
