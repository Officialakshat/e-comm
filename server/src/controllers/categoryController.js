import Category from "../models/Category.js";
import Product from "../models/Product.js";

// ===============================
// GET ALL CATEGORIES
// ===============================

export async function getCategories(req, res) {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category.name,
        });

        return {
          _id: category._id,
          name: category.name,
          icon: category.icon,
          description: category.description,
          status: category.status,
          productCount,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      categories: categoriesWithCount,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===============================
// CREATE CATEGORY
// ===============================

export async function createCategory(req, res) {
  try {
    const { name, icon, description, status } = req.body;

    if (!name || !icon) {
      return res.status(400).json({
        success: false,
        message: "Category name and icon are required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      icon: icon.trim(),
      description: description?.trim() || "",
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: {
        ...category.toObject(),
        productCount: 0,
      },
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===============================
// UPDATE CATEGORY
// ===============================

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;

    const { name, icon, description, status } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check duplicate name
    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Another category with this name already exists",
        });
      }

      // IMPORTANT:
      // If category name changes, update products
      await Product.updateMany(
        { category: category.name },
        { $set: { category: name.trim() } },
      );

      category.name = name.trim();
    }

    if (icon !== undefined) {
      category.icon = icon.trim();
    }

    if (description !== undefined) {
      category.description = description.trim();
    }

    if (status !== undefined) {
      category.status = status;
    }

    await category.save();

    const productCount = await Product.countDocuments({
      category: category.name,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: {
        ...category.toObject(),
        productCount,
      },
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===============================
// DELETE CATEGORY
// ===============================

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

    const productCount = await Product.countDocuments({
      category: category.name,
    });

    // Prevent accidental deletion if products exist
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete "${category.name}" because it has ${productCount} products`,
        productCount,
      });
    }

    await Category.findByIdAndDelete(id);

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
