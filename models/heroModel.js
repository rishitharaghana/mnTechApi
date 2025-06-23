const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title_lines: { type: String, required: true },
    subheading: { type: String, required: true },
    subhighlight: { type: String,},
    description: { type: String, required: true },
    button_text: { type: String, required: true },
    button_path:{type:String},
    
    image: [{type:String, }],
    features: [
      {
        title: String,
        tooltip_title: String,
        tooltip_text: String,
      },
    ],
     intro_heading: { type: String },
  intro_highlight: { type: String }, 
  paragraph_text: { type: String }, 
  },
  { timestamps: true }
);
module.exports = mongoose.model("Hero", heroSchema);
