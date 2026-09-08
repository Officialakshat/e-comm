import { Router } from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

// GET ALL
router.get("/", protect, admin, getCategories);

// CREATE
router.post("/", protect, admin, createCategory);

// UPDATE
router.put("/:id", protect, admin, updateCategory);

// DELETE
router.delete("/:id", protect, admin, deleteCategory);

export default router;
