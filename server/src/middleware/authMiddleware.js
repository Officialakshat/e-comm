const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect routes

exports.protect = async (req, res, next) => {
  let token;

  try {
    // check authorization header

    if (
      req.headers.authorizations &&
      req.headers.authorizations.startsWith("Bearer")
    ) {
      // get token from header
      token = req.header.authorizations.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from DB
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "not authorized , no token",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Admin access only",
    });
  }
};
