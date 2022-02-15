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
      new ErrorResponseAPI(
        `No course found with the ID of ${req.params.id}`,
        404
      )
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
  // Manually re-assign the following
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  // Check for the bootcamp
  if (!bootcamp) {
    return next(
      new ErrorResponseAPI(
        `No bootcamp found with the ID of ${req.params.bootcampId}`,
        404
      )
    );
  }

  // Create course
  const course = await Course.create(req.body);

  // Response
  res.status(201).json({ success: true, data: course });
});

//-----------------------------------------------------------------------------------
// @desc     Update a course
// @route    PUT /api/v1/courses/:id
// @access   Private
const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  // Check for the course
  if (!course) {
    return next(
      new ErrorResponseAPI(
        `No course found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  // Update course
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Response
  res.status(200).json({ success: true, data: course });
});

//-----------------------------------------------------------------------------------
// @desc     Delete a course
// @route    DELETE /api/v1/courses/:id
// @access   Private
const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  // Check for the course
  if (!course) {
    return next(
      new ErrorResponseAPI(
        `No course found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  // Delete course: We will be using a middleware to perform this action
  awaitcourse.remove();

  // Response
  res.status(200).json({ success: true, data: {} });
});

//-----------
// Exports
//----------
module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
