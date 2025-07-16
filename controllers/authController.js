const reachUsModel = require("../models/reachUsModel");
const registerModel = require("../models/registerModel");
const teamModel = require("../models/teamModel");
const newsLetter = require("../models/newsLetterSubscribeModel");
const contactus = require('../models/contactModel');
const mongoose = require("mongoose")

const phoneRegex = /^[6-9]\d{9}$/;

module.exports = {
  register: async (req, res) => {
    try {
      if (req.method === "POST") {
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

       
        const newRegister = new registerModel({ name, number, password });
        await newRegister.save();

        return res.status(201).json({ message: "User registered successfully", data: newRegister });
      } else if (req.method === "GET") {
        
        try {
          const users = await registerModel.find().sort({ createdAt: -1 });
          return res.status(200).json({ message: "Users retrieved successfully", data: users });
        } catch (error) {
          console.error("Error fetching users:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      } else if (req.method === "DELETE") {
        const { id } = req.params;

     
        if (!id) {
          return res.status(400).json({ error: "ID is required for deletion." });
        }

       
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid ID format." });
        }

        try {
          const deletedUser = await registerModel.findByIdAndDelete(id);
          if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
          }
          return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error in register controller:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      if (req.method === "POST") {
        const { number, password } = req.body;
        if (!number || !password) {
          return res.status(400).json({ error: "Phone number and password are required." });
        }
        if (!phoneRegex.test(number)) {
          return res.status(400).json({ error: "Invalid phone number. Must be 10 digits starting with 6-9." });
        }
        const user = await registerModel.findOne({ number });
        if (!user) {
          return res.status(401).json({ error: "Invalid phone number or password." });
        }
        if (user.password !== password) {
          return res.status(401).json({ error: "Invalid phone number or password." });
        }
        return res.status(200).json({
          message: "Login successful",
          data: { id: user._id, name: user.name, number: user.number },
        });
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error in login controller:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

 getAllCounts: async (req, res) => {
    try {
      if (req.method === "GET") {
        
        const teamCount = await teamModel.countDocuments();
        const reachUsCount = await reachUsModel.countDocuments();
        const  newsLetterSubscribeCount = await newsLetter.countDocuments();
        const contactCount = await contactus.countDocuments();



       
        const response = [
          { type: "Team Count", count: teamCount },
          { type: "ReachUs Count", count: reachUsCount },
          {type:"Subscribe Count",count:newsLetterSubscribeCount},
          {type:"Contact Us Count",count:contactCount}
        ];

        return res.status(200).json({ message: "Counts retrieved successfully", data: response });
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};