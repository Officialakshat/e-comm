import { verify } from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
}

export function admin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
}
