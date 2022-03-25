const mongoose = require("mongoose");

const logger = require("../helpers/logger");

const setMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger("Mongo Database connected", "success");
  } catch (error) {
    logger("Error at try connect to Mongo Database", "error");
    throw new Error(`Error at try connect to Mongo Database:\n${error}`);
  }
};

module.exports = {
  setMongoDB,
};
