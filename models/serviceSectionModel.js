const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String,  },
  description: { type: String, },
  icon: { type: String,  },
});

const serviceSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, },       
    itServicesTitle: { type: String, },    
    productsTitle: { type: String,},   
    itServices: [itemSchema],
    products: [itemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceSection", serviceSchema);
