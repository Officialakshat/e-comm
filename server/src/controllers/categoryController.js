import Category from "../models/Category.js";

// Generate URL-friendly slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// Escape special regex characters
const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// GET ACTIVE CATEGORIES (CUSTOMER SIDE)
export async function getCategories(req, res) {
  try {
    const categories = await Category.find({
      isActive: true,
    }).sort({ name: 1 });

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

// GET ALL CATEGORIES (ADMIN SIDE)
export async function getAdminCategories(req, res) {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get Admin Categories Error:", error);

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

    // Check duplicate category name
    const existing = await Category.findOne({
      name: {
        $regex: `^${escapeRegex(name)}$`,
        $options: "i",
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    const slug = generateSlug(name);

    // Check duplicate slug
    const existingSlug = await Category.findOne({ slug });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "A category with a similar name already exists",
      });
    }

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

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const oldName = category.name;

    // Update category name and slug
    if (req.body.name !== undefined) {
      const name = req.body.name.trim();

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      // Check duplicate name
      const duplicate = await Category.findOne({
        _id: { $ne: id },
        name: {
          $regex: `^${escapeRegex(name)}$`,
          $options: "i",
        },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another category already uses this name",
        });
      }

      const newSlug = generateSlug(name);

      // Check duplicate slug
      const duplicateSlug = await Category.findOne({
        _id: { $ne: id },
        slug: newSlug,
      });

      if (duplicateSlug) {
        return res.status(409).json({
          success: false,
          message: "A category with a similar name already exists",
        });
      }

      category.name = name;
      category.slug = newSlug;
    }

    // Update description
    if (req.body.description !== undefined) {
      category.description = req.body.description.trim();
    }

    // Update active/inactive status
    if (req.body.isActive !== undefined) {
      if (typeof req.body.isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be true or false",
        });
      }

      category.isActive = req.body.isActive;
    }

    await category.save();

    // Update existing products if category name changed
    if (oldName !== category.name) {
      const Product = (await import("../models/product.js")).default;

      await Product.updateMany(
        { category: oldName },
        {
          $set: {
            category: category.name,
          },
        },
      );
    }

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

    // Check whether products are using this category
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
