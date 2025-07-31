const Contact = require("../models/contactModel");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^[6-9]\d{9}$/;

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, agreeToUpdates } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number." });
    }

    const newContact = new Contact({ name, email, phone, message, agreeToUpdates });
    await newContact.save();

    return res.status(201).json({ message: "Form submitted successfully", data: newContact });
  } catch (error) {
    console.error("Create contact error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Get contact error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(400).json({ error: "Contact ID is required for update." });

    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Contact not found." });

    return res.status(200).json({ message: "Contact updated", data: updated });
  } catch (error) {
    console.error("Update contact error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(400).json({ error: "Contact ID is required for deletion." });

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Contact not found." });

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllContacted = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching all contacted users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
  getAllContacted,
};
