const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserPofile,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

// protected routes
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getUserPofile);
module.exports = router;

// admin route
const { admin } = require("../middleware/authMiddleware");

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
