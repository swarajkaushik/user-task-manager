const mongoose = require("mongoose");
require("dotenv").config();
const mongo_url = process.env.MONGO_DB_URL;

const connect = async () => {
  await mongoose.connect(mongo_url);
};

module.exports = connect;
