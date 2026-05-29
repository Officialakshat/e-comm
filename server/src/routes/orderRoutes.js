const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", protect, createOrder);

// GET MY ORDERS
router.get("/myorders", protect, getMyOrders);

// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);

// ADMIN GET ALL ORDERS
router.get("/", protect, admin, getOrders);

// ADMIN UPDATE STATUS
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
