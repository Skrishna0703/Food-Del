import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";
import axios from "axios";
import crypto from "crypto";

dotenv.config();

// Utility: Create JWT token
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });

// ---------------- Auth Controllers ----------------

// Login User
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isStrong) {
      return res.status(400).json({
        success: false,
        message:
          "Weak password. Must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ---------------- OAuth Controllers ----------------

// Google OAuth Redirect
const googleAuth = (req, res) => {
  const redirectUri = `${process.env.BASE_URL}/auth/google/callback`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email&redirect_uri=${redirectUri}&response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&access_type=offline&prompt=consent`;
  return res.redirect(url);
};

// Google OAuth Callback
const googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code for tokens
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
        },
      }
    );

    const { access_token } = data;

    // Get user info from Google
    const { data: googleUser } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Find or create user
    let user = await userModel.findOne({ email: googleUser.email });
    if (!user) {
      user = new userModel({
        name: googleUser.name,
        email: googleUser.email,
        password: crypto.randomBytes(16).toString("hex"),
        photoURL: googleUser.picture,
      });
      await user.save();
    }

    const token = createToken(user._id);
    return res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Authentication failed" });
  }
};

// Get logged-in user profile
const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Export all controllers
export default {
  loginuser,
  registerUser,
  googleAuth,
  googleAuthCallback,
  getMe,
};
