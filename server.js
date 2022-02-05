// Import and Load env Vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Express
const express = require("express");
const app = express();

// Rest of the Packages
const morgan = require("morgan");

// Router imports
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

//--------------------------
// Our ROUTES w/ Routers
//--------------------------

// Middlewares: Mounting the Routers Properly ✔✔
app.use("/api/v1/bootcamps", bootcampRouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}....`
  );
});
