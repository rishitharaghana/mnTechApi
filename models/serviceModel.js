const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
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
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String }, // Add icon field to match controller and JSON
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);