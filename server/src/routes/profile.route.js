import { Router } from "express";
const router = Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth.middlewares.js');

router.route('/profile').get(getProfile);
router.route('/profile').put(updateProfile);

export default router;
