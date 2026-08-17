import { Router } from "express";

const router = Router();

import {
  registerUser,
  loginUser,
  getUserPofile,
} from "../controllers/authController.js";

router.post("/register", registerUser);

router.post("/login", loginUser);

// protected routes
import { protect } from "../middleware/authMiddleware.js";

router.get("/profile", protect, getUserPofile);
export default router;

// admin route
import { admin } from "../middleware/authMiddleware.js";

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
