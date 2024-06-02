const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;

class UserService {
  async postUser(payload) {
    try {
      // Generate token
      const token = jwt.sign({ id: payload.id }, TOKEN_SIGNATURE);

      // Create the user
      const user = await User.create(payload);
      user.tokens = user.tokens.concat({ token });
      await user.save();

      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(payload, res) {
    try {
      const { email, password } = payload;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, TOKEN_SIGNATURE);
      user.tokens.push({ token });
      await user.save();
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = UserService;
