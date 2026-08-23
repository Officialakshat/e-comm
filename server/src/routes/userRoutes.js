import { Router } from "express";

import { getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

// ADMIN — GET ALL CUSTOMERS
router.get("/", protect, admin, getUsers);

export default router;
