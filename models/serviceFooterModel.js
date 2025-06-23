const mongoose = require("mongoose");

const ServiceFooterSchema = new mongoose.Schema({
  logoText: {
    part1: { type: String, required: true }, // e.g., MN
    part2: { type: String, required: true }, // e.g., techs
  },
  joinHeading: { type: String, required: true },
joinDescription: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  socialLinks: {
    facebook: { type: String, required: true },
    instagram: { type: String, required: true },
    linkedin: { type: String, required: true },
    twitter: { type: String, required: true },
    youtube: { type: String, required: true },
  },
  links: [
    { label: { type: String, required: true } ,
   path: { type: String, required: true }
  }, 
    
  ],
  copyright: { type: String, required: true },
  reserved: { type: String, required: true }
});

module.exports = mongoose.model("ServiceFooter", ServiceFooterSchema);
