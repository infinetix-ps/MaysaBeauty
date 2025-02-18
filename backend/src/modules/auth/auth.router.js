import { Router } from "express";
import * as controller from './auth.controller.js'
import { checkEmail } from './../../middleware/checkEmail.js';
import { asyncHandler } from './../../utlis/catchError.js';
const router = Router();

router.post('/register',checkEmail,asyncHandler(controller.register));
router.post('/login',controller.login);
router.patch('/sendCode',controller.sendCode);
router.patch('/forgetPassword',controller.forgetPassword);
router.post('/verify-email', asyncHandler(controller.verifyEmail));
router.post("/resend-otp", asyncHandler(controller.resendOTP));

export default router;