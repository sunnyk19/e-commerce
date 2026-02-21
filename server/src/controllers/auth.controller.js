import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "defaultsecretkey",
    { expiresIn: "7d" }
  );
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP temporarily (in production, use Redis or database)
const otpStore = new Map();

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Send response
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token: generateToken(newUser),
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Login attempt for:", email);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    console.log("User found:", user.email);
    console.log("Stored password hash:", user.password);
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// SEND OTP
export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 5-minute expiry
    otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    
    console.log(`OTP for ${mobile}: ${otp}`); // In production, send via SMS API
    
    res.status(200).json({ 
      message: "OTP sent successfully",
      // Remove this in production - for testing only
      otp: otp 
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: error.message });
  }
};

// VERIFY OTP AND LOGIN
export const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile and OTP are required" });
    }

    // Check OTP
    const storedOTP = otpStore.get(mobile);
    
    if (!storedOTP) {
      return res.status(400).json({ message: "OTP expired or not requested" });
    }

    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(mobile);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified - find user and login
    const user = await User.findOne({ mobile });
    
    if (!user) {
      return res.status(404).json({ message: "User not found with this mobile" });
    }

    // Clear OTP after successful verification
    otpStore.delete(mobile);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: error.message });
  }
};
