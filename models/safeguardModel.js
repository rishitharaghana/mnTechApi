const mongoose = require("mongoose");

const safeguardSchema = new mongoose.Schema(
  {
    title: { type: String,  },
    subtitle: { type: String,  },
    cards: [
      {
        heading: { type: String,  },
        description: { type: String,  },
        button_text: { type: String,  },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Safeguard", safeguardSchema);
