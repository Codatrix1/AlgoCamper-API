const mongoose = require("mongoose");
const validator = require("validator"); // package for custom validation intergated with mongoose Custom Validation Options
const slugify = require("slugify");
const geocoderAPI = require("../utils/geocoder");
const geocoder = require("../utils/geocoder");

// Schema for bootcamp details
const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the bootcamp"],
    unique: true,
    trim: true,
    maxlength: [50, "Bootcamp name cannot be more than 50 characters"],
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Please provide a description for the bootcamp"],
    maxlength: [500, "Bootcamp description cannot be more than 500 characters"],
  },

  website: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Please provide a valid URL with HTTP or HTTPS",
    },
    // match: [
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   "Please provide a valid URL with HTTP or HTTPS",
    // ],
  },

  phone: {
    type: String,
    maxlength: [20, "Contact number cannot be longer than 20 characters"],
  },

  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please use a valid email",
    },
  },

  address: {
    type: String,
    required: [true, "Please provide an address for the bootcamp"],
  },

  location: {
    // GeoJSON: Code from Mongoose V6.2.0 Docs
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      // Index for Geospatial data: To Boost performance while reading data via Queries
      // From MongoDB Docs : Selects geometries within a bounding GeoJSON geometry
      // The 2dsphere and 2d indexes support $geoWithin.
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },

  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating cannot be more than 10"],
  },

  averageCost: Number,

  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  housing: {
    type: Boolean,
    default: false,
  },

  jobAssistance: {
    type: Boolean,
    default: false,
  },

  jobGuarantee: {
    type: Boolean,
    default: false,
  },

  acceptGi: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//------------------------------------------
// Using Hooks as a middleware in Mongoose
//------------------------------------------
//---------------------------------------
// Creating slugs using names w/ slugify
bootcampSchema.pre("save", function (next) {
  // Warning: "this" points to current document on NEW Document Creation: Will NOT WORK while updating a document
  this.slug = slugify(this.name, { lower: true });
  next();
});

//--------------------------------------------------
// GeoCode & Create Location Field w/ node-geocoder
bootcampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    // GeoJSON here: longitude comes first and then the latitude: Check Mongoose Docs
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  // Do Not save address in DB: As it will be geocoded with this function
  this.address = undefined;
  next();
});

//----------------------------------------------
// Creating a model and exporting it as default
const Bootcamp = mongoose.model("Bootcamp", bootcampSchema);
module.exports = Bootcamp;
