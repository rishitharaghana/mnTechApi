const registerModel = require("../models/registerModel");
const reachUsModel = require("../models/reachUsModel");
const teamModel = require("../models/teamModel");
const newsLetter = require("../models/newsLetterSubscribeModel");
const contactus = require("../models/contactModel");
const mongoose = require("mongoose");

const phoneRegex = /^[6-9]\d{9}$/;

module.exports = {
  // Create new user
  registerUser: async (req, res) => {
    try {
      const { name, number, password } = req.body;

      if (!name || !number || !password) {
        return res.status(400).json({ error: "Name, Phone, and Password are required." });
      }

      if (!phoneRegex.test(number)) {
        return res.status(400).json({ error: "Invalid phone number. Must be 10 digits starting with 6-9." });
      }

      const existingUser = await registerModel.findOne({ number });
      if (existingUser) {
        return res.status(400).json({ error: "Phone number already registered." });
      }

      const newUser = new registerModel({ name, number, password });
      await newUser.save();

      return res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get all registered users
  getAllUsers: async (req, res) => {
    try {
      const users = await registerModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
      console.error("Fetch users error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete user by ID
  deleteUser: async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Valid user ID is required." });
    }

    try {
      const deletedUser = await registerModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // User login
  loginUser: async (req, res) => {
    try {
      const { number, password } = req.body;

      if (!number || !password) {
        return res.status(400).json({ error: "Phone number and password are required." });
      }

      if (!phoneRegex.test(number)) {
        return res.status(400).json({ error: "Invalid phone number. Must be 10 digits starting with 6-9." });
      }

      const user = await registerModel.findOne({ number });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid phone number or password." });
      }

      return res.status(200).json({
        message: "Login successful",
        data: { id: user._id, name: user.name, number: user.number },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get dashboard counts
  getAllCounts: async (req, res) => {
    try {
      const [teamCount, reachUsCount, newsLetterSubscribeCount, contactCount] = await Promise.all([
        teamModel.countDocuments(),
        reachUsModel.countDocuments(),
        newsLetter.countDocuments(),
        contactus.countDocuments()
      ]);

      const response = [
        { type: "Team Count", count: teamCount },
        { type: "ReachUs Count", count: reachUsCount },
        { type: "Subscribe Count", count: newsLetterSubscribeCount },
        { type: "Contact Us Count", count: contactCount }
      ];

      return res.status(200).json({ message: "Counts retrieved successfully", data: response });
    } catch (error) {
      console.error("Fetch counts error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};