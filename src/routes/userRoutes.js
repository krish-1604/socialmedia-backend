import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/profile/:userId', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

export default router;