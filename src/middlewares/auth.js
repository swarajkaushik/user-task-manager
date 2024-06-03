const { verify } = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verify(token, TOKEN_SIGNATURE);

    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
