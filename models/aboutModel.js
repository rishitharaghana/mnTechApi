const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  subtitle: { type: String, required: true },        
  title: { type: String, required: true },          
  highlight: { type: String, required: true },       
  paragraph1: { type: String, required: true },
  paragraph2: { type: String, required: true },
  buttonText: { type: String,  },   
  buttonLink: { type: String, },    
  image: { type: String, },           
});

module.exports = mongoose.model("About", aboutSchema);
