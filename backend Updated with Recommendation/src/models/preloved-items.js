const mongoose = require("mongoose");

const prelovedItemsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prelovedItems: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        productId: { type: String, required: true },
        title: { type: String, default: "NA" },
        image: { type: String, required: true },
        description: { type: String, default: "NA" },
        price: { type: Number, default: 0.0 },
        brand: { type: String, default: "" },
        forSale: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("preloved-items", prelovedItemsSchema);
