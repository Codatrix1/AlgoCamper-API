const User = require("../models/userModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  createTokenAndAttachCookiesToResponse,
} = require("../middlewares/authMiddleware");

//-------------------------------------------------------------
// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public

const register = asyncHandler(async (req, res, next) => {
  // Destructure & Pull out the fields from req.body
  const { name, email, password, role } = req.body;

  // Create user: Validation via Mongoose Schema/Model
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create user token and send in response via cookie:
  createTokenAndAttachCookiesToResponse(user, 200, res);
});

//----------------------------------------------------------------
// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public

const login = asyncHandler(async (req, res, next) => {
  // Destructure & Pull out the fields from req.body
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponseAPI("Please provide an email and password", 400)
    );
  }

  // Check for user in the DB: also select the "password" field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponseAPI("Invalid credentials", 401));
  }

  // If email found in DB, check the entered "password" with compare method defined in the user model
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorResponseAPI("Invalid credentials", 401));
  }

  // If everything checks out correctly, Create user token and send in response via cookie
  createTokenAndAttachCookiesToResponse(user, 200, res);
});

//-------------------------------------------------------------
// @desc     Get current logged in user
// @route    GET /api/v1/auth/me
// @access   Private

const showMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // console.log(user);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//---------
// Exports
//---------
module.exports = { register, login, showMe };
