const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    originalPassword: {
      type: String,

    },
    access: {
      type: Boolean,
      default: 'true'
    }
    // role:{
    //     type: String,
    //     enum: ['admin', 'user'],
    //     default: 'admin',
    // }
    // contactNumber: { type: String },
    // profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.originalPassword = password
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.method({
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
});

module.exports = mongoose.model("Users", userSchema);
