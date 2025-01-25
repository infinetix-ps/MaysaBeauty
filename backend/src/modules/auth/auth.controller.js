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

        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email }, CONFIRM_EMAIL_SECRET, { expiresIn: "1h" });
        await SendEmail(email, "Welcome", userName, token);

        return res.status(201).json({ message: "Registration successful. Please confirm your email.", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
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
