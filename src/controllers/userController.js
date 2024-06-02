const { userServiceIns } = require("../services/index");
const JoiValidationHelper = require("../utils/JoiValidationHelper");
const {
  signUpSchema,
  loginSchema,
} = require("../joiValidationSchemas/userValidationSchema");

class UserController {
  async postUser(req, res) {
    try {
      const validatedValue = JoiValidationHelper(signUpSchema, req?.body);
      const response = await userServiceIns.postUser(validatedValue);
      return res.status(201).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully created the user",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: {},
        success: false,
        err: error.message,
        message: "Cannot create the user",
      });
    }
  }

  async loginUser(req, res) {
    try {
      const validatedValue = JoiValidationHelper(loginSchema, req?.body);
      const response = await userServiceIns.loginUser(validatedValue, res);
      return response;
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: {},
        success: false,
        err: error.message,
        message: "Cannot login the user",
      });
    }
  }
}

module.exports = UserController;
