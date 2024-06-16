const express = require("express");
const locationRouter = express.Router();
const locationController = require("../controllers/locationController");

// POST location
locationRouter.post("/", locationController);

module.exports = locationRouter;
