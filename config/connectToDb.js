const mongoose = require("mongoose");
const dotenv = require("dotenv").config;

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected To Database");
  } catch (error) {
    console.log("Something wrong happened");
  }
};
module.exports = connectToMongo;
