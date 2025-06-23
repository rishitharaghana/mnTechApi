const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema({
  sectionSubtitle: { type: String, required: true },
  sectionTitle: { type: String, required: true },
  features: [
    {
      icon: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  buttons: [
    {
      text: { type: String, required: true },
      link: { type: String,  },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Collaboration", collaborationSchema);
