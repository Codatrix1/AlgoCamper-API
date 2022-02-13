const Course = require("../models/courseModel");
const Bootcamp = require("../models/bootcampModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");

//----------------------------------------------------------------------
// @desc     Get all courses
// @route    GET /api/v1/courses
// @route    GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
const getAllCourses = asyncHandler(async (req, res, next) => {
  // initialize a query
  let query;

  // check for params and build the queries
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  // Execute the query
  const courses = await query;

  // Response
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

//-----------------------------------------------------------------------------------
// @desc     Get Single course
// @route    GET /api/v1/courses/:id
// @access   Public
const getSingleCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  // Check for course
  if (!course) {
    return next(
      ErrorResponseAPI(`No course found with the ID: ${req.params.id}`),
      404
    );
  }

  // Response
  res.status(200).json({ success: true, data: course });
});

//-----------------------------------------------------------------------------------
// @desc     Create/Add a course to the bootcamp
// @route    POST /api/v1/bootcamps/:bootcampId/courses
// @access   Private
const addCourse = asyncHandler(async (req, res, next) => {
  // re-assign the following
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  // Check for the bootcamp
  if (!bootcamp) {
    return next(
      ErrorResponseAPI(
        `No bootcamp found with the ID: ${req.params.bootcampId}`
      ),
      404
    );
  }

  // Create course
  const course = await Course.create(req.body);

  // Response
  res.status(201).json({ success: true, data: course });
});

//-----------
// Exports
//----------
module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
};
