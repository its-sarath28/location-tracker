const mongoose = require("mongoose");

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(err.message);
  }
};

dbConnect();
