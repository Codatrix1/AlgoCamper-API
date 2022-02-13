// express and router invoking
const express = require("express");

// Include other resource routers: to achieve ❗ NESTED Routing/RE-ROUTING
const courseRouter = require("./courseRoutes");

// Invoke the main router
const router = express.Router();

// import controller
const bootcampController = require("../controllers/bootcampController");

//-----------------------------------------------------------
// ❗ NESTED Routing OR RE-ROUTE into other resource routers
//----------------------------------------------------------
router.use("/:bootcampId/courses", courseRouter);

//---------------------------------------------------------------------
// Dedicated Route for GeoSpatial Query: Get Bootcamps within a radius
//---------------------------------------------------------------------
router
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

//-------------------
// Rest Of the Routes
//-------------------
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
