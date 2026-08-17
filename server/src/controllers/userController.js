import { find } from "../models/User.js";
import Order from "../models/Order.js";

// ADMIN — GET ALL CUSTOMERS
export async function getUsers(req, res) {
  try {
    const users = await find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
