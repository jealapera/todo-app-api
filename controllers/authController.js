const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { validationResult } = require('express-validator');
const User = require("../models/userModel");

function generateToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });
}

exports.register = async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      // Check if user with provided email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
  
      // If user doesn't exist, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      
      const token = generateToken(newUser._id);
      
      res.status(201).json({ message: "User registered successfully.", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Registration failed.");
    }
};  

exports.login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = generateToken(user._id);
    res.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Login failed.");
  }
};
