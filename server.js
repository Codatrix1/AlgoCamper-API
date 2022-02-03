// Import and Load env Vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Express
const express = require("express");
const app = express();

// Route files
const bootcampRouter = require("./routes/bootcampRoutes");

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
