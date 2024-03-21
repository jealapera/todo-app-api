const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiry} = require("../config");
const { validationResult } = require('express-validator');
const User = require("../models/userModel");
const { success, error } = require("../utils/apiResponse");

function generateToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiry });
}

exports.register = async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(error(res.statusCode, errors.array()));
      }
  
      const { email, password } = req.body;
  
      // Check if user with provided email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json(error(res.statusCode, "Email already registered"));
      }
  
      // If user doesn't exist, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      
      const token = generateToken(newUser._id);
      
      res.status(201).json(success(res.statusCode, "User registered successfully.", token));
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json(error(res.statusCode, "Registration failed."));
    }
};  

exports.login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(error(res.statusCode, errors.array()));
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json(error(res.statusCode, "User is not registered"));
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json(error(res.statusCode, "Invalid email or password"));
    }
    
    const token = generateToken(user._id);
    res.json(success(res.statusCode, "Login successfully.", token));
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json(error(res.statusCode, "Login failed."));
  }
};
