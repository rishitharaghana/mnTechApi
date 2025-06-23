const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  socialLinks: {
    facebook: { type: String,  },
    instagram: { type: String, },
    youtube: { type: String,},
  },
  sectionTitles: {
    menuTitle: { type: String, required: true },
    productTitle: { type: String, required: true },
    branchTitle: { type: String, required: true }
  },
  menuLinks: [
    {
      label: { type: String, required: true },
      path: { type: String,  }
    }
  ],
  productLinks: [
    {
      label: { type: String, required: true },
      path: { type: String,}
    }
  ],
  branch: {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  policyLinks: [
    {
      label: { type: String, required: true },
      path: { type: String,  }
    }
  ],
  copyright: {
    type: String,
   
  }
});

module.exports = mongoose.model("Footer", footerSchema);
