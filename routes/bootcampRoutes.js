// express and router invoking
const express = require("express");
const router = express.Router();

// import controller
const bootcampController = require("../controllers/bootcampController");

// Dedicated Route for GeoSpatal Query: Get Bootcamps within a radius
router
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

// setup Routes
router
  .route("/")
  .get(bootcampController.getAllBootcamps)
  .post(bootcampController.createBootcamp);

router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

// Export router
module.exports = router;
