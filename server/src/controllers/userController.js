import User from "../models/User.js";
import Order from "../models/Order.js";

// ADMIN — GET ALL CUSTOMERS
export async function getUsers(req, res) {
  try {
    // 1. Get all normal customers
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    // 2. Calculate order statistics for each customer
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: "$user",

          // Total number of orders
          orders: {
            $sum: 1,
          },

          // Total amount spent
          spent: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    // 3. Convert order statistics into a lookup object
    const statsMap = {};

    orderStats.forEach((item) => {
      statsMap[item._id.toString()] = {
        orders: item.orders,
        spent: item.spent,
      };
    });

    // 4. Combine user data + order statistics
    const customers = users.map((user) => {
      const userId = user._id.toString();

      const stats = statsMap[userId] || {
        orders: 0,
        spent: 0,
      };

      // 5. Automatically determine customer badge
      let badge = "New";

      if (stats.spent >= 15000) {
        badge = "Premium";
      } else if (stats.spent >= 5000) {
        badge = "Regular";
      }

      return {
        id: user._id,
        name: user.name,
        email: user.email,

        // First letter of user's name
        avatar: user.name?.charAt(0).toUpperCase() || "U",

        // Shopping statistics
        orders: stats.orders,
        spent: stats.spent,

        // Account creation date
        joined: new Date(user.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        // Customer badge
        badge,

        // Original dates
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    // 6. Send response
    res.status(200).json({
      success: true,
      count: customers.length,
      users: customers,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
