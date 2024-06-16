const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    coordinates: {
      type: [Number], // An array of numbers
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2; // Ensure it has exactly two elements
        },
        message: "Coordinates must have exactly two elements",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", LocationSchema);
