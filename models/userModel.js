const mongoose = require("mongoose");
const validator = require("validator"); // package for custom validation intergated with mongoose Custom Validation Options

//-------------------------------
// Schema for bootcamp details
//-------------------------------
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },

  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please use a valid email",
    },
  },

  role: {
    type: String,
    // for admin rights, goto DB and add "admin" manually through Atlas or Compass
    enum: ["user", "publisher"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//----------------------------------------------
// Creating a model and exporting it as default
const User = mongoose.model("User", UserSchema);
module.exports = User;
