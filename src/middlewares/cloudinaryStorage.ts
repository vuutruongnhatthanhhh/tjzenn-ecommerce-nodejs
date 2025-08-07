// src/middlewares/cloudinaryStorage.ts

import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "@/utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file) => {
    const folder = req.query.folder || "default";
    const originalName = file.originalname.split(".")[0];
    const uniqueSuffix = Date.now();

    return {
      folder,
      public_id: `${originalName}-${uniqueSuffix}`,
      format: "webp",
      transformation: [{ quality: "auto" }],
    };
  },
});

const upload = multer({ storage });

export default upload;
