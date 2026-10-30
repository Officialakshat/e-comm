import { Router } from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

// Public: customers and product forms can read categories
router.get("/", getCategories);

// Admin only: manage categories
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
