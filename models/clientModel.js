const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
 {
  title: {type: String, },
  clients: [
    {
      company_name: {type:String, },
      image:{type:String, },
    }
  ]
},
  { timestamps: true }
);
module.exports = mongoose.model("Client", clientSchema);
