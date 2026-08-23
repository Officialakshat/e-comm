import express from "express";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// public routes

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

// Admin routes

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

router.post(
  "/upload",
  protect,
  admin,
  upload.single("image"),
  uploadProductImage,
);

export default router;
