import Category from "../models/Category.js";

// GET ALL CATEGORIES
export async function getCategories(req, res) {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// CREATE CATEGORY
export async function createCategory(req, res) {
  try {
    const name = req.body.name?.trim();
    const description = req.body.description?.trim() || "";

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existing = await Category.findOne({
      name: {
        $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const category = await Category.create({
      name,
      slug,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// UPDATE CATEGORY
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const duplicate = await Category.findOne({
      _id: { $ne: id },
      name: {
        $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Another category already uses this name",
      });
    }

    const oldName = category.name;

    category.name = name;
    category.slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (req.body.description !== undefined) {
      category.description = req.body.description.trim();
    }

    await category.save();

    // Keep existing products linked to the renamed category.
    const Product = (await import("../models/product.js")).default;

    await Product.updateMany(
      { category: oldName },
      { $set: { category: name } },
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE CATEGORY
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const Product = (await import("../models/product.js")).default;

    const productsUsingCategory = await Product.countDocuments({
      category: category.name,
    });

    if (productsUsingCategory > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete this category because ${productsUsingCategory} product(s) use it. Reassign those products first.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
