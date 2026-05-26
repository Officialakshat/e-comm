const Product = require("../models/product");

// Create product

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all product

exports.getProducts = async (req, res) => {
  try {
    const pageSize = 5;

    const page = Number(req.query.page) || 1;

    // SEARCH
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // CATEGORY FILTER
    const category = req.query.category ? { category: req.query.category } : {};

    // PRICE FILTER
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;

    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : 999999;

    // SORTING
    let sortOption = { createdAt: -1 };

    if (req.query.sort === "low") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "high") {
      sortOption = { price: -1 };
    }

    // FINAL QUERY
    const query = {
      ...keyword,
      ...category,
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };

    // COUNT PRODUCTS
    const count = await Product.countDocuments(query);

    // GET PRODUCTS
    const products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortOption);

    res.json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single product
exports.getSingleProduct = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
