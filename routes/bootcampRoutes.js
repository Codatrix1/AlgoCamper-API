// Imports for router
const express = require("express");
const router = express.Router();

// import controller
const bootcampController = require("../controllers/bootcampController");

// Routes
router
  .route("/")
  .get(bootcampController.getAllBootcamps)
  .post(bootcampController.createBootcamp);

router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

// Exporting router
module.exports = router;
