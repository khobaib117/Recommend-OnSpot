const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
      event :{
        type: String,
        required: true
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventSchema);