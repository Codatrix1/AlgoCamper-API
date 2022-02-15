// imports
const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// import models
const Bootcamp = require("./models/bootcampModel");
const Course = require("./models/courseModel");

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON Data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`)
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`)
);

// Import into database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);

    console.log("Data imported successfully to the Database...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete existing data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data destroyed successfully from the Database...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Conditional import/delete based on argv values
// To Import all: node seeder -import
// To delete all: node seeder -delete
if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
}
