const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/", protect, addToCart);

// GET USER CART
router.get("/", protect, getCart);

// UPDATE CART ITEM
router.put("/:id", protect, updateCartItem);

// REMOVE CART ITEM
router.delete("/:id", protect, removeCartItem);

module.exports = router;
