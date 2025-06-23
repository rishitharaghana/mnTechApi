const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  title:{type: String},
  name: { type: String ,required:true},
  designation: { type: String,required: true  },
  image: { type: String ,required: true },
  linkedin_url: { type: String },
  twitter_url: { type: String }, 
  facebook_url: { type: String }, 
  instagram_url: { type: String } 
},
 {timestamps:true}
);

module.exports = mongoose.model('Team', teamSchema);