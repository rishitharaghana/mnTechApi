const mongoose = require("mongoose");

const SaasApplicationSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  heading: { type: String, required: true },
  subtitle: { type: String, required: true },
  services: [
    {
      icon: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("SaasApplication", SaasApplicationSchema);
