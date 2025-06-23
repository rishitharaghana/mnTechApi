const mongoose = require("mongoose");

const reachUsSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9+\-\s()]{7,20}$/ },
    role: { type: String },
    product_design: { type: String, required: true },
    product_description: { type: String, required: true },
    project_budget: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReachUs", reachUsSchema);
