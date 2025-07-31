const Navigation = require("../models/navigationModel");
const mongoose = require('mongoose');

module.exports = {
  
  createNavigation: async (req, res) => {
    try {
      const { name, path, submenu } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }

      const newItem = new Navigation({
        name,
        path,
        submenu: Array.isArray(submenu) ? submenu : [],
      });

      await newItem.save();
      return res.status(201).json({ message: "Nav item added", data: newItem });
    } catch (err) {
      console.error("Error creating navigation item:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getNavigation: async (req, res) => {
    try {
      const items = await Navigation.find().sort({ _id: -1 });
      return res.status(200).json(items);
    } catch (err) {
      console.error("Error fetching navigation items:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateNavigation: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is required." });
    }

    try {
      const updated = await Navigation.findByIdAndUpdate(id, req.body, { new: true });

      if (!updated) {
        return res.status(404).json({ error: "Navigation item not found." });
      }

      return res.status(200).json({ message: "Nav item updated", data: updated });
    } catch (err) {
      console.error("Error updating navigation item:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteNavigation: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is required." });
    }

    try {
      const deleted = await Navigation.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Navigation item not found." });
      }

      return res.status(200).json({ message: "Nav item deleted" });
    } catch (err) {
      console.error("Error deleting navigation item:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  productsList: (req, res) => {},
  
};
