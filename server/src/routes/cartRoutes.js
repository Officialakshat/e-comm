import { Router } from "express";

const router = Router();

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

// ADD TO CART
router.post("/", protect, addToCart);

// GET USER CART
router.get("/", protect, getCart);

// UPDATE CART ITEM
router.put("/:id", protect, updateCartItem);

// REMOVE CART ITEM
router.delete("/:id", protect, removeCartItem);

export default router;
