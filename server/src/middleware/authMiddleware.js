const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log(req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      // FIND USER
      req.user = await User.findById(decoded.id).select("-password");

      console.log("USER:", req.user);

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};
