const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

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

module.exports = router;
