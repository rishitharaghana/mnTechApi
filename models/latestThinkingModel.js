const mongoose = require("mongoose");

const latestThinkingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    author: {type:String, required: true, default: "Jane"}
  },
  { timestamps: true }
);
module.exports = mongoose.model("LatestThinking", latestThinkingSchema);
