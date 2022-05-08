const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  wardrobeItems: [
    {
      title: { type: String, default: "NA" },
      image: { type: String, required: true },
      description: { type: String, default: "NA" },
      preloved: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Wardrobe", wardrobeSchema);
