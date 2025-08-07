// src/app.ts
import express from "express";
import indexRoutes from "@/routes/index.routes";
import apiRoutes from "@/routes/index";

const app = express();

// Middleware
app.use(express.json());

app.use("/", indexRoutes);

// Routes
app.use("/api/v1", apiRoutes);

export default app;
