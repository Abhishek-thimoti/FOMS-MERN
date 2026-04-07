import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({
      username,
      password // Note: In a production app, password should be hashed with bcrypt
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (user && user.password === password) { // Production should use bcrypt.compare
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
