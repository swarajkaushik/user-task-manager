const JoiValidationHelper = require("../utils/JoiValidationHelper");
const { taskServiceIns } = require("../services/index");
const {
  postTaskSchema,
  fetchByIdTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
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

  async updateTask(req, res) {
    try {
      const finalPayload = { ...req?.body, taskId: req.params.taskId };
      const validatedValue = JoiValidationHelper(
        updateTaskSchema,
        finalPayload
      );
      const response = await taskServiceIns.updateTask(
        validatedValue,
        req?.user?._id
      );
      return res.status(200).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully updated the task",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        success: false,
        error: error.message,
        message: "Cannot update the task",
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const finalPayload = { ...req?.body, taskId: req.params.taskId };
      const validatedValue = JoiValidationHelper(
        deleteTaskSchema,
        finalPayload
      );
      await taskServiceIns.deleteTask(validatedValue);
      return res.status(204).json({
        success: true,
        error: {},
        message: "Successfully deleted the task",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Cannot delete the task",
      });
    }
  }

  async getAllTasks(req, res) {
    try {
      const response = await taskServiceIns.getAllTasks(req?.user?._id);
      return res.status(200).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully fetched the tasks",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        success: false,
        error: error.message,
        message: "Cannot fetch the tasks",
      });
    }
  }
}

module.exports = TaskController;
