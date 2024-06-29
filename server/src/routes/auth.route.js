import { Router } from "express";
const router = Router();

import { login, register, verify } from "../controllers/authController.js";

router.route(`/register`).post(register);
router.route(`/verify/:userId`).post(verify);
router.route(`/login`).post(login);

export default router;