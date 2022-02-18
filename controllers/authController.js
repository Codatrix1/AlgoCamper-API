const User = require("../models/userModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public

const register = asyncHandler(async (req, res, next) => {
  // Destructure & Pull out the fields from req.body
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({ success: true });
});

//---------
// Exports
//---------
module.exports = { register };
