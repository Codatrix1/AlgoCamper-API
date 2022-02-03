// import and Load env Vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Express
const express = require("express");
const app = express();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}....`
  );
});
