const express = require("express");
const router = express.Router({ mergeParams: true }); // Router w/ ❗ Nested Routing/ Re-Routing

const courseController = require("../controllers/courseController");

// Routes
router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.addCourse);

router.route("/:id").get(courseController.getSingleCourse);

// Export router
module.exports = router;
