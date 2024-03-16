"use strict";


const mongoose = require("mongoose");





const CLUSTER = process.env?.DATABASE_URI || "mongodb:
const DATABASE = process.env?.DATABASE_NAME || "";







const connectDB = async () => {
  try {
    
    await mongoose.connect(`${CLUSTER}${DATABASE}`);
    console.log(`*** DB${DATABASE && " " + DATABASE} Connected ***`);
  } catch (err) {
    console.log(`*** DB${DATABASE && " " + DATABASE} Connection Error ***`);
    console.error(err);
  }
};

module.exports = connectDB;
