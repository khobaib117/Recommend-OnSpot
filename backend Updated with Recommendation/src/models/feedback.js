const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, 'please enter feedback']
        },
        number: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);