// imports express and router invoking
const express = require("express");
const router = express.Router();

// import controller
const authController = require("../controllers/authController");

// auth middleware
const { protect } = require("../middlewares/authMiddleware");

// Router setup
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/me").get(protect, authController.showMe);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").put(authController.resetPassword);

//---------------
// Export router
//---------------
module.exports = router;
