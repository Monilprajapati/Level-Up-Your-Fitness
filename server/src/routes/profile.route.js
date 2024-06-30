import { Router } from "express";
const router = Router();
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

router.route('/profile').get(authMiddleware, getProfile);
router.route('/profile').put(authMiddleware, updateProfile);

export default router;
