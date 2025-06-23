const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
   mainTitle: {type: String, required: true},
  highlight: {type: String, },
  suffix: {type: String, },
  values: [
    {
      title: {type: String, required: true},
      description: {type: String, required: true}
    }
  ],
});

module.exports = mongoose.model("Value", valueSchema);
