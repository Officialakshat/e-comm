import { Router } from "express";

import {
  getCategories,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

// Public: customers can read active categories
router.get("/", getCategories);

// Admin only: read all categories, including inactive ones
router.get("/admin", protect, admin, getAdminCategories);

// Admin only: manage categories
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
