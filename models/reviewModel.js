const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    user_name: { type: String, required: true },

    comments: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
