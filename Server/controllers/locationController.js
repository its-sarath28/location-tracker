const Location = require("../models/Location");

const locationController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    console.log("Latitude is: ", latitude);
    console.log("Longitude is: ", longitude);
    let location = await Location.findOne();
    if (location) {
      location.coordinates = [latitude, longitude];
      location.timestamp = Date.now();
      await location.save();
    } else {
      location = new Location({ coordinates: [latitude, longitude] });
      await location.save();
    }
    res.status(200).send(location);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = locationController;
