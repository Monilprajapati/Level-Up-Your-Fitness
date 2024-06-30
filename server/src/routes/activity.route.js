import { Router } from "express";
const router = Router();
import { logActivity, getActivitySummary } from "../controllers/activityController";
import { authMiddleware } from "../middlewares/auth.middlewares";

// Activity log routes
router.route('/activity-log').post(authMiddleware, logActivity)
router.route('/activity-summary').post(authMiddleware, getActivitySummary)

module.exports = router;
