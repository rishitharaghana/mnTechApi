const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  heading: { type: String, required: true },
  subtitle: { type: String, required: true },
  topBanner: {
    icon: { type: String }, 
    title: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
  },
  callToAction: {
    buttonText: { type: String },
    buttonLink: { type: String },
  },
  services: [
    {
      title: { type: String, required: true },
      description: { type: String, },
       icon: { type: String }
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
