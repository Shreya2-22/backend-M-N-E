import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ success: false, message: "This email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    res.set("channelName", "ShreyaMernStack");
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Error in user login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in user logout:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
