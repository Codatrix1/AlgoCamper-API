// imports express and router invoking
const express = require("express");
const router = express.Router();

// import controller
const authController = require("../controllers/authController");

// Router setup
router.route("/register").post(authController.register);

//---------------
// Export router
//---------------
module.exports = router;
