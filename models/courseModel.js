const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },

  description: {
    type: String,
    required: [true, "Please add the course description"],
  },

  weeks: {
    type: String,
    required: [true, "Please add the number of weeks"],
  },

  tuition: {
    type: Number,
    required: [true, "Please add the tuition cost"],
  },

  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },

  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Parent Referencing: NOT written as an Array like Child Ref, but as an Object itself like other fields in Schema
  // Bootcamp Model is the Parent here: Course Model is the Child
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

//----------------------------------------------
// Creating a model and exporting it as default
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
