const Contact = require("../models/contactModel");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^[6-9]\d{9}$/;

module.exports = {
  contactUS: async (req, res) => {
    const id = req.params.id;

    try {
      if (req.method === "POST") {
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
      }

      else if (req.method === "GET") {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
      }

      else if (req.method === "PUT") {
        if (!id) return res.status(400).json({ error: "Contact ID is required for update." });

        const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ error: "Contact not found." });

        return res.status(200).json({ message: "Contact updated", data: updated });
      }

      else if (req.method === "DELETE") {
        if (!id) return res.status(400).json({ error: "Contact ID is required for deletion." });

        const deleted = await Contact.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Contact not found." });

        return res.status(200).json({ message: "Contact deleted successfully" });
      }

      else {
        return res.status(405).json({ error: "Method not allowed" });
      }

    } catch (error) {
      console.error("Contact controller error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllContacted: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
