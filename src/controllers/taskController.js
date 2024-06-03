const JoiValidationHelper = require("../utils/JoiValidationHelper");
const { taskServiceIns } = require("../services/index");
const {
  postTaskSchema,
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
}

module.exports = TaskController;
