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

// imports routers
const bootcampRouter = require("./routes/bootcampRoutes");

// import middlewares
// const loggerMiddleware = require("./middlewares/logger");

//-------------------
// MIDDLEWARE STACK
//------------------
// Custom Logger middleware
// app.use(loggerMiddleware);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body Parser: to access json data from req.body
app.use(express.json());

//--------------------------
// Mounting the Routers
//--------------------------
app.use("/api/v1/bootcamps", bootcampRouter);

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
