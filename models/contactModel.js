const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, },
    email: { type: String, required: true },
    message: { type: String },
    agreeToUpdates: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
