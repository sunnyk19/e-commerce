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
