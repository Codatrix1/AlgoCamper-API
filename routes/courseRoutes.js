const express = require("express");
const router = express.Router({ mergeParams: true }); // Router w/ ❗ Nested Routing/ Re-Routing

const courseController = require("../controllers/courseController");

// Routes
router.route("/").get(courseController.getAllCourses);

// Export router
module.exports = router;
