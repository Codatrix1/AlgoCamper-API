const Bootcamp = require("../models/bootcampModel");
const ErrorResponseAPI = require("../utils/errorResponseAPI");
const asyncHandler = require("../middlewares/asyncHandler");
const geocoder = require("../utils/geocoder");

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
const getAllBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc     Get single bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponseAPI(
        `Bootcamp not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});

// @desc     Update bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponseAPI(
        `Bootcamp not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Delete bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponseAPI(
        `Bootcamp not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc     GeoSpatial Query: Get bootcamps within a radius
// @route    GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access   Private
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from the geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians: MongoDB uses radians
  // Divide distance by Radius of the Earth
  // Earth Radius = 3963 mi / 6378 km
  const radius = distance / 3963.2;

  // MongoDB Docs: If you use longitude and latitude, specify longitude first.
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// Exports
module.exports = {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};
