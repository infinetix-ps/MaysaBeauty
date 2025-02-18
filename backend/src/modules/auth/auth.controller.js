import userModel from "../../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import SendEmail from "../../utlis/email.js";

const SALT_ROUNDS = parseInt(process.env.SALTROUND);
const JWT_SECRET = process.env.LOGINSIG;
const CONFIRM_EMAIL_SECRET = process.env.CONFIRM_EMAILTOKEN;

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Generate 6-digit OTP and set expiration (valid for 10 mins)
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            otpCode,
            otpExpires,
            confirmEmail: false, // Email is unconfirmed until OTP is verified
        });

        // Send OTP via email
        await SendEmail(email, "Email Verification", 
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    .email-container {
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        margin: 20px auto;
                    }
                    .email-header {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                    }
                    .otp-box {
                        font-size: 32px;
                        font-weight: bold;
                        color: #ffffff;
                        background: #007BFF;
                        padding: 10px;
                        border-radius: 5px;
                        display: inline-block;
                        margin: 20px 0;
                        letter-spacing: 4px;
                    }
                    .email-footer {
                        font-size: 14px;
                        color: #777;
                        margin-top: 20px;
                    }
                    .cta-button {
                        background: #28a745;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        font-weight: bold;
                        border-radius: 5px;
                        display: inline-block;
                        margin-top: 10px;
                    }
                    .cta-button:hover {
                        background: #218838;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <p class="email-header">🔐 Verify Your Email</p>
                    <p>Use the OTP below to verify your email address. This code will expire in 10 minutes.</p>
                    <div class="otp-box">${otpCode}</div>
                    <p>If you didn't request this, you can ignore this email.</p>
                    <p class="email-footer">Thank you for choosing our service! 🚀</p>
                </div>
            </body>
            </html>`);
            

        return res.status(201).json({ message: "Registration successful. Please verify your email using the OTP." });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP matches
        if (user.otpCode !== parseInt(otpCode)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpires) {
            return res.status(400).json({ message: "OTP has expired, please request a new one" });
        }

        // Mark email as confirmed
        user.confirmEmail = true;
        user.otpCode = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate new OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

        user.otpCode = otpCode;
        user.otpExpires = otpExpires;
        await user.save();

        // 🎨 Creative HTML Template
        const otpEmailTemplate = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; }
                    .container { max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); }
                    .logo { font-size: 24px; font-weight: bold; color: #007bff; }
                    .otp { font-size: 28px; font-weight: bold; color: #ff4500; background: #f8f8f8; padding: 10px; border-radius: 5px; display: inline-block; }
                    .footer { margin-top: 20px; font-size: 12px; color: #888; }
                    .btn { display: inline-block; background: #007bff; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">🔐 Secure OTP Verification</div>
                    <h2>Your One-Time Password</h2>
                    <p>Use the following OTP to verify your account. This code is valid for 10 minutes.</p>
                    <p class="otp">${otpCode}</p>
                    <p class="footer">If you didn’t request this, please ignore this email.</p>
                </div>
            </body>
            </html>
        `;

        await SendEmail(email, "🔐 Your New OTP Code", otpEmailTemplate);

        return res.status(200).json({ message: "OTP resent successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, CONFIRM_EMAIL_SECRET);
        const updatedUser = await userModel.findOneAndUpdate(
            { email: decoded.email },
            { confirmEmail: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Email confirmed successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (!user.confirmEmail) {
            return res.status(400).json({ message: "Please confirm your email first" });
        }

        if (user.status === "NotActive") {
            return res.status(403).json({ message: "Your account is blocked" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const sendCode = async (req, res) => {
    try {
        const { email } = req.body;

        const code = customAlphabet("123456789abcdef", 6)();
        const user = await userModel.findOneAndUpdate(
            { email },
            { sendCode: code },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await SendEmail(email, "Reset Password", `<h2>Your reset code is: ${code}</h2>`);

        return res.status(200).json({ message: "Reset code sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email, password, code } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.sendCode !== code) {
            return res.status(400).json({ message: "Invalid reset code" });
        }

        user.password = await bcrypt.hash(password, SALT_ROUNDS);
        user.sendCode = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
