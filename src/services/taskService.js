const Task = require("../models/Task");
const mongoose = require("mongoose");

class TaskService {
  async postTask(payload, authUser) {
    try {
      const finalPayload = { ...payload, owner: authUser };
      const task = await Task.create(finalPayload);
      if (!task) {
        throw new Error("Task not created");
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(payload) {
    try {
      let task = await Task.findOne({
        _id: payload.taskId,
        isDeleted: false,
      });
      if (!task) {
        throw new Error("Task not found");
      }
      let subtasks = task.subtasks.filter((task) => task.isDeleted === false);
      task.subtasks = subtasks;
      return task;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;
