import { Router } from "express";
const router = Router();

import { login, register, verify, logout } from "../controllers/authController.js";

router.route(`/register`).post(register);
router.route(`/verify`).post(verify);
router.route(`/login`).post(login);
router.route(`/logout`).post(logout);

export default router;