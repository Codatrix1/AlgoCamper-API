const express = require("express");
const router = express.Router({ mergeParams: true }); // Router w/ ❗ Nested Routing/ Re-Routing

// import controller
const courseController = require("../controllers/courseController");

// import factory function middleware and model
const advancedResults = require("../middlewares/advancedResults");
const Course = require("../models/courseModel");

// Routes
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    courseController.getAllCourses
  )
  .post(courseController.addCourse);

router
  .route("/:id")
  .get(courseController.getSingleCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

// Export router
module.exports = router;
