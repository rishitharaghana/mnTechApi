const mongoose = require('mongoose');
const ServiceFooter = require("../models/serviceFooterModel");
const Footer = require("../models/footerModel");

module.exports = {
  
  // SERVICE FOOTER HANDLERS
  createServiceFooter: async (req, res) => {
    const {
      logoText,
      address,
      phone,
      email,
      socialLinks,
      links,
      copyright,
      reserved,
      joinHeading,
      joinDescription,
    } = req.body;

    if (!logoText || !address || !phone || !email || !socialLinks || !links) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    try {
      const footer = new ServiceFooter({
        logoText,
        address,
        phone,
        email,
        socialLinks,
        links,
        copyright,
        reserved,
        joinHeading,
        joinDescription,
      });

      await footer.save();
      return res.status(201).json({ message: "Service footer saved", data: footer });
    } catch (err) {
      console.error("Error saving footer:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getServiceFooter: async (req, res) => {
    try {
      const footer = await ServiceFooter.find().sort({ _id: -1 });
      return res.status(200).json(footer);
    } catch (err) {
      console.error("Error fetching footer:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateServiceFooter: async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await ServiceFooter.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Footer updated", data: updated });
    } catch (err) {
      console.error("Error updating footer:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteServiceFooter: async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await ServiceFooter.findByIdAndDelete(id);
      return res.status(200).json({ message: "Footer deleted" });
    } catch (err) {
      console.error("Error deleting footer:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // FOOTER HANDLERS
  createFooter: async (req, res) => {
    try {
      const {
        socialLinks,
        sectionTitles,
        menuLinks,
        productLinks,
        branch,
        copyright,
        policyLinks,
      } = req.body;

      const cleanProductLinks = req.body["productLinks"] || req.body["productLinks\t"];

      if (!socialLinks || !sectionTitles || !menuLinks || !cleanProductLinks || !branch || !policyLinks) {
        return res.status(400).json({ error: "All required fields must be provided." });
      }

      const newFooter = new Footer({
        socialLinks: JSON.parse(socialLinks),
        sectionTitles: JSON.parse(sectionTitles.replace(/^json/, "")),
        menuLinks: JSON.parse(menuLinks),
        productLinks: JSON.parse(cleanProductLinks),
        branch: JSON.parse(branch),
        policyLinks: JSON.parse(policyLinks),
        copyright,
      });

      await newFooter.save();
      return res.status(201).json({ message: "Footer saved successfully", data: newFooter });
    } catch (error) {
      console.error("Error saving footer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getFooter: async (req, res) => {
    try {
      const footers = await Footer.find().sort({ _id: -1 });
      return res.status(200).json(footers);
    } catch (error) {
      console.error("Error fetching footer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateFooter: async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required for update." });

    try {
      const updated = await Footer.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Footer updated", data: updated });
    } catch (error) {
      console.error("Error updating footer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteFooter: async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required for deletion." });

    try {
      await Footer.findByIdAndDelete(id);
      return res.status(200).json({ message: "Footer deleted successfully" });
    } catch (error) {
      console.error("Error deleting footer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
