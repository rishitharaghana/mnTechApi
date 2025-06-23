const mongoose = require("mongoose");

const navigationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  submenu: [
    {
      name: { type: String, required: true },
      path: { type: String,},
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Navigation", navigationSchema);
