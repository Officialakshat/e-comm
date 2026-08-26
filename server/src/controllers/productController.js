import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

// ======================================================
// CREATE PRODUCT
// ======================================================
export async function createProduct(req, res) {
  try {
    const { name, description, price, category, stock, brand, image } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      brand,
      image,
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
    const pageSize = 5;

    const page = Number(req.query.page) || 1;

    // ==================================================
    // SEARCH
    // ==================================================
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
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
      ...stockFilter,
      price,
      ...featured,
      ...newArrival,
      ...bestDeal,
      ...stock,
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

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
