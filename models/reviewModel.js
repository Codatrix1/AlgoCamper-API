const mongoose = require("mongoose");

//--------------------
// Defining a Schema
//--------------------
const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },

  text: {
    type: String,
    required: [true, "Please add some text"],
  },

  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Parent Referencing: NOT written as an Array like Child Ref, but as an Object itself like other fields in Schema
  // Bootcamp Model is the Parent here: Review Model is the Child
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },

  // Parent Referencing: NOT written as an Array like Child Ref, but as an Object itself like other fields in Schema
  // User Model is the Parent here: Review Model is the Child
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

//--------------------------------------------------------------------------------------------
// Compound Indexing: Making sure that a single "user" can add "only one review per bootcamp"
//--------------------------------------------------------------------------------------------
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

//----------------------------------------------
// Creating a model and exporting it as default
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
