import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

// ======================================================
// CREATE PRODUCT
// ======================================================
export async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      stock,
      brand,
      image,
      featured,
      newArrival,
      bestDeal,
      dealEndsAt,
    } = req.body;

    const sellingPrice = Number(price);
    const oldPrice = Number(originalPrice);

    let discountPercentage = 0;

    if (oldPrice > sellingPrice) {
      discountPercentage = Math.round(
        ((oldPrice - sellingPrice) / oldPrice) * 100,
      );
    }

    const product = await Product.create({
      name,
      description,
      price: sellingPrice,
      originalPrice: oldPrice,
      discountPercentage,
      category,
      stock,
      brand,
      image,
      featured: Boolean(featured),
      newArrival: Boolean(newArrival),
      bestDeal: Boolean(bestDeal),
      dealEndsAt: bestDeal ? dealEndsAt : null,
      rating: 0,
      numReviews: 0,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET ALL PRODUCTS
// ======================================================
export async function getProducts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 5;

    // ==================================================
    // SEARCH
    // ==================================================

    const keyword = req.query.keyword?.trim();

    const escapedKeyword = keyword
      ? keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      : "";

    const searchFilter = keyword
      ? {
          $or: [
            { name: { $regex: escapedKeyword, $options: "i" } },
            { brand: { $regex: escapedKeyword, $options: "i" } },
            { description: { $regex: escapedKeyword, $options: "i" } },
          ],
        }
      : {};

    // ==================================================
    // CATEGORY FILTER
    // ==================================================
    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    // ==================================================
    // PRICE FILTER
    // ==================================================
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : 999999999;

    const price = {
      $gte: minPrice,
      $lte: maxPrice,
    };

    // ==================================================
    // STOCK STATUS FILTER
    // ==================================================
    let stockFilter = {};

    if (req.query.stockStatus === "out") {
      stockFilter = {
        stock: 0,
      };
    }

    if (req.query.stockStatus === "low") {
      stockFilter = {
        stock: {
          $gt: 0,
          $lte: 10,
        },
      };
    }

    if (req.query.stockStatus === "in") {
      stockFilter = {
        stock: {
          $gt: 10,
        },
      };
    }

    const brand = req.query.brand
      ? {
          brand: req.query.brand,
        }
      : {};

    // ==================================================
    // FEATURED FILTER
    // ==================================================
    const featured = req.query.featured === "true" ? { featured: true } : {};

    // ==================================================
    // NEW ARRIVAL FILTER
    // ==================================================
    const newArrival =
      req.query.newArrival === "true" ? { newArrival: true } : {};

    // ==================================================
    // BEST DEAL FILTER
    // ==================================================
    const bestDeal = req.query.bestDeal === "true" ? { bestDeal: true } : {};

    // ==================================================
    // STOCK FILTER
    // ==================================================
    let stock = {};

    if (req.query.stock === "inStock") {
      stock = {
        stock: {
          $gt: 0,
        },
      };
    }

    if (req.query.stock === "outOfStock") {
      stock = {
        stock: {
          $eq: 0,
        },
      };
    }

    if (req.query.stock === "lowStock") {
      stock = {
        stock: {
          $gt: 0,
          $lte: 10,
        },
      };
    }

    // ==================================================
    // SORTING
    // ==================================================
    let sortOption = {
      createdAt: -1,
    };

    if (req.query.sort === "low") {
      sortOption = {
        price: 1,
      };
    }

    if (req.query.sort === "high") {
      sortOption = {
        price: -1,
      };
    }

    // ==================================================
    // FINAL QUERY
    // ==================================================
    const query = {
      ...keyword,
      ...category,
      ...brand,
      ...stockFilter,
      price,
      ...featured,
      ...newArrival,
      ...bestDeal,
      ...stock,
      ...searchFilter,
    };

    // ==================================================
    // COUNT
    // ==================================================
    const count = await Product.countDocuments(query);

    // ==================================================
    // GET PRODUCTS
    // ==================================================
    const products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortOption);

    // ==================================================
    // RESPONSE
    // ==================================================
    res.json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET SINGLE PRODUCT
// ======================================================
export async function getSingleProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// UPDATE PRODUCT
// ======================================================
export async function updateProduct(req, res) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { price, originalPrice, bestDeal, dealEndsAt } = req.body;

    const sellingPrice = price !== undefined ? Number(price) : product.price;

    const oldPrice =
      originalPrice !== undefined
        ? Number(originalPrice)
        : product.originalPrice;

    let discountPercentage = 0;

    if (oldPrice > sellingPrice) {
      discountPercentage = Math.round(
        ((oldPrice - sellingPrice) / oldPrice) * 100,
      );
    }

    const updateData = {
      ...req.body,
      price: sellingPrice,
      originalPrice: oldPrice,
      discountPercentage,
      dealEndsAt: bestDeal ? dealEndsAt : null,
    };

    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// DELETE PRODUCT
// ======================================================
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// UPLOAD PRODUCT IMAGE
// ======================================================
export async function uploadProductImage(req, res) {
  try {
    console.log("UPLOAD FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("FILE PATH:", req.file.path);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    });

    console.log("CLOUDINARY RESULT:", result.secure_url);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// CREATE PRODUCT REVIEW
// ======================================================

export async function createProductReview(req, res) {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please write a review comment",
      });
    }

    // Check whether the customer received this product
    const deliveredOrder = await Order.findOne({
      user: userId,
      orderStatus: "Delivered",
      "orderItems.product": productId,
    });

    if (!deliveredOrder) {
      return res.status(403).json({
        success: false,
        message: "You can review this product after it has been delivered.",
      });
    }

    // Prevent multiple reviews from the same customer
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    await Review.create({
      product: productId,
      user: userId,
      rating: numericRating,
      comment: comment.trim(),
    });

    // Calculate updated average rating
    const result = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const averageRating = result[0].averageRating;
    const totalReviews = result[0].totalReviews;

    // Update product rating and review count
    product.rating = Number(averageRating.toFixed(1));
    product.numReviews = totalReviews;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      rating: product.rating,
      numReviews: product.numReviews,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    console.error("Create Review Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET PRODUCT REVIEWS
// ======================================================

export async function getProductReviews(req, res) {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// export async function uploadProductImage(req, res) {
//   try {
//     console.log("UPLOAD FILE:", req.file);

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }

//     console.log("FILE PATH:", req.file.path);

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "ecommerce-products",
//     });

//     console.log("CLOUDINARY RESULT:", result.secure_url);

//     res.status(200).json({
//       success: true,
//       imageUrl: result.secure_url,
//     });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }
