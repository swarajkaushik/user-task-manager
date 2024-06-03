const JoiValidationHelper = require("../utils/JoiValidationHelper");
const { taskServiceIns } = require("../services/index");
const {
  postTaskSchema,
  fetchByIdTaskSchema,
} = require("../joiValidationSchemas/taskValidationSchema");

class TaskController {
  async postTask(req, res) {
    try {
      const validatedValue = JoiValidationHelper(postTaskSchema, req?.body);
      const response = await taskServiceIns.postTask(
        validatedValue,
        req?.user?._id
      );
      return res.status(201).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully created the task",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        success: false,
        error: error.message,
        message: "Cannot create the task",
      });
    }
  }

  async getTaskById(req, res) {
    try {
      const validatedValue = JoiValidationHelper(
        fetchByIdTaskSchema,
        req?.params
      );
      const response = await taskServiceIns.getTaskById(validatedValue);
      return res.status(200).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully fetched the task",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        success: false,
        error: error.message,
        message: "Cannot fetch the task",
      });
    }
  }
}

module.exports = TaskController;
