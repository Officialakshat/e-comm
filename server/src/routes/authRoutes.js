const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserPofile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

// protected routes
router.get("/profile", protect, getUserPofile);
module.exports = router;

const { admin } = require("../middleware/authMiddleware");

// admin route

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
