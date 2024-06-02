const express = require("express");
const bodyParse = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const connect = require("../config/database-config");
const UserRoutes = require("./routes/userRoutes.js");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParse.json());
  app.use(bodyParse.urlencoded({ extended: true }));

  app.use("/api/users", UserRoutes);

  app.listen(PORT, async () => {
    console.log(`Server is started at PORT: ${PORT}`);
    await connect();
    console.log("Mongodb connected.");
  });
};

setupAndStartServer();
