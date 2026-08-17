import { Router } from "express";

const router = Router();

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

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

export default router;
