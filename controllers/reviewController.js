const Review = require("../models/reviewModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");

//----------------------------------------------------------------------
// @desc     Get all reviews
// @route    GET /api/v1/reviews
// @route    GET /api/v1/bootcamps/:bootcampId/reviews
// @access   Public
const getAllReviews = asyncHandler(async (req, res, next) => {
  // check for params
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    // Response For getting all the reviews in a single bootcamp
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    // For getiing filtered response coming from the advancedResults middleware
    res.status(200).json(res.advancedResults);
  }
});

//---------
// Exports
//---------
module.exports = {
  getAllReviews,
};
