// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // nếu đọc token từ cookies
import indexRoutes from "@/routes/index.routes";
import apiRoutes from "@/routes/index";

const app = express();

const FRONTEND_ORIGIN = "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // header FE gửi lên
  })
);

app.options("*", cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(cookieParser());
app.use(express.json());

// Routes public
app.use("/", indexRoutes);

// API routes
app.use("/api/v1", apiRoutes);

export default app;
