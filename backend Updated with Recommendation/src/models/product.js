const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageLink: {
      type: String,
      required: true,
      unique: true,
    },
    productLink: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category:{
      type: mongoose.Schema.Types.ObjectId, ref:'Categories'
    },
    event:{
      type: mongoose.Schema.Types.ObjectId, ref:'Events'
    }
    // productImages: [{ image: { type: String } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);