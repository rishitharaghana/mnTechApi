const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, required: true },       
    itServicesTitle: { type: String, required: true },    
    productsTitle: { type: String,},   
    itServices: [itemSchema],
    products: [itemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceSection", serviceSchema);
