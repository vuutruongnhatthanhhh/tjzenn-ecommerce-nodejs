// src/routes/index.routes.ts

import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello from Nodejs + Express");
});

export default router;
