const mongoose = require("mongoose");

const favProductSchema = new mongoose.Schema(
  {
    email :{
        type: String,
        required:true
    },
    productId:{
      type: String,
      required:true
    },
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
      type: mongoose.Schema.Types.ObjectId, ref:'Categories'
    },
    
    
  },
 
);

module.exports = mongoose.model("FavouriteProducts", favProductSchema);