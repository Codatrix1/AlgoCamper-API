const User = require("../models/userModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public

const register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

//---------
// Exports
//---------
module.exports = { register };
