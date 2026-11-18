import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/product.js";

export const createOrder = async (req, res) => {
  const updatedProductIds = [];

  try {
    const {
      customerName,
      customerPhone,
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // 1. Validate customer details
    if (!customerName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }

    if (!/^\+?[0-9\s-]{7,15}$/.test(customerPhone || "")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    // 2. Validate order items
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // 3. Validate shipping address
    const { address, city, postalCode, country } = shippingAddress || {};

    if (
      ![address, city, postalCode, country].every(
        (value) => typeof value === "string" && value.trim(),
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping details",
      });
    }

    // 4. Only Cash on Delivery for now
    if (paymentMethod !== "Cash on Delivery") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // 5. Validate and combine duplicate product IDs
    const quantities = new Map();

    for (const item of orderItems) {
      const productId = item.product || item.productId;
      const quantity = Number(item.quantity);

      if (
        !mongoose.isValidObjectId(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity",
        });
      }

      quantities.set(
        productId.toString(),
        (quantities.get(productId.toString()) || 0) + quantity,
      );
    }

    // 6. Fetch products from database
    const productIds = [...quantities.keys()];

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more products were not found",
      });
    }

    // 7. Calculate prices using database values
    const orderItemsForDB = [];
    let itemsPrice = 0;

    for (const product of products) {
      const quantity = quantities.get(product._id.toString());

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      orderItemsForDB.push({
        product: product._id,
        name: product.name,
        image: product.image || "",
        price: product.price,
        quantity,
      });

      itemsPrice += product.price * quantity;
    }

    // 8. Calculate shipping and total
    const shippingPrice = 0;
    const totalPrice = itemsPrice + shippingPrice;

    // 9. Reduce stock safely
    for (const item of orderItemsForDB) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { new: true },
      );

      if (!updatedProduct) {
        throw new Error(
          `Stock changed while placing order for ${item.name}. Please try again.`,
        );
      }

      updatedProductIds.push({
        productId: item.product,
        quantity: item.quantity,
      });
    }

    // 10. Save order in MongoDB
    const order = await Order.create({
      user: req.user._id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderItems: orderItemsForDB,
      shippingAddress: {
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
      },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    // Restore stock if order creation fails
    for (const item of updatedProductIds) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: item.quantity } },
      );
    }

    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to place order",
    });
  }
};

// GET LOGGED-IN USER ORDERS
export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Allow admin to view any order
    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ADMIN — GET ALL ORDERS
export async function getOrders(req, res) {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ADMIN — UPDATE ORDER STATUS
export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Processing",
      "Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Return Requested",
      "Returned",
    ];

    // Validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update status
    order.orderStatus = status;

    // Delivered
    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    } else {
      order.isDelivered = false;
      order.deliveredAt = undefined;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
