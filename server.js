// import core modules
const path = require("path");

// Import and Load env Vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// import and connect to DB
const connectDB = require("./config/connectDB");
connectDB();

// express setup
const express = require("express");
const app = express();

// Rest of the packages
const morgan = require("morgan");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

// imports routers
const bootcampRouter = require("./routes/bootcampRoutes");
const courseRouter = require("./routes/courseRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// import middlewares
// const loggerMiddleware = require("./middlewares/logger");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

//-------------------
// MIDDLEWARE STACK
//------------------
// Custom Logger middleware
// app.use(loggerMiddleware);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // Body Parser: to access json data from req.body
app.use(fileUpload()); // invoke express-fileUpload

// Data Sanitization: Cleaning all the data that is coming from some Malacious code
// a) against NoSQL query Injections: MongoDB Operators that return "true" in all queries
app.use(mongoSanitize());

// to access cookie data from req.cookies
app.use(cookieParser());

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

//--------------------------
// Mounting the Routers
//--------------------------
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

// Invoking error handler middlewares
app.use(errorHandlerMiddleware);

//--------------------------
// Setting up the Server
//--------------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}....`.yellow
      .bold
  );
});

//--------------------------------------
// Handling Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔥 Shutting Down ");
  console.log(`${err.name}, ${err.message}`.red.bold);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
