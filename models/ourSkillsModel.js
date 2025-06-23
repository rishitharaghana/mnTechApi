const mongoose = require("mongoose");

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true, min: 0, max: 100 },
});

const ourSkillsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    highlight: { type: String, required: true },
    skills: [skillItemSchema],
       buttonText: { type: String, default: "More" },    
    buttonLink: { type: String, default: "/skills" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("OurSkills", ourSkillsSchema);
