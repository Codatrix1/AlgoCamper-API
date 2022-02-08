const ErrorResponseAPI = require("../utils/errorResponseAPI");

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to the console for dev
  //   console.log(err.stack.red);
  console.log(err);

  // Mongoose Bad Request Error: Bad ObjectId
  if (err.name === "CastError") {
    const message = `Bootcamp not found with the ID of ${err.value}`;
    error = new ErrorResponseAPI(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered for ${Object.keys(
      err.keyValue
    )}`;
    error = new ErrorResponseAPI(message, 400);
  }

  // Mongoose validation error
  if ((err.name = "ValidationError")) {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponseAPI(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error:
      error.message ||
      "Server Error: Something went very wrong. Please try again later",
  });
};

module.exports = errorHandlerMiddleware;
