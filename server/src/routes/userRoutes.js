import { Router } from "express";

const router = Router();

import { create } from "../models/User.js";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
