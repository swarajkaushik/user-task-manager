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

  async getTaskById(payload, authUser) {
    try {
      let task = await Task.findOne({
        _id: payload.taskId,
        owner: authUser,
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

  async updateTask(payload, authUser) {
    const taskId = payload.taskId;
    delete payload.taskId;
    try {
      const task = await Task.findOneAndUpdate(
        {
          _id: taskId,
          owner: authUser,
          isDeleted: false,
        },
        payload,
        { new: true }
      );

      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(payload, authUser) {
    const taskId = payload.taskId;
    delete payload.taskId;
    try {
      const task = await Task.findOneAndUpdate(
        {
          _id: taskId,
          owner: authUser,
        },
        {
          isDeleted: payload.isDeleted,
        },
        { new: true }
      );

      return task;
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(authUser) {
    try {
      let tasks = await Task.find({
        owner: authUser,
        isDeleted: false,
      });

      if (!tasks || tasks.length === 0) {
        throw new Error("No tasks found");
      }

      // Filter out deleted subtasks for each task
      tasks = tasks.map((task) => {
        task.subtasks = task.subtasks.filter(
          (subtask) => subtask.isDeleted === false
        );
        return task;
      });

      return tasks;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching tasks");
    }
  }

  async getAllSubtasks(payload, authUser) {
    try {
      let tasks = await Task.findOne({ _id: payload?.taskId, owner: authUser });

      if (!tasks) {
        throw new Error("Subtasks not found");
      }

      let subtasks = tasks.subtasks.filter((task) => task.isDeleted === false);
      return subtasks;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching tasks");
    }
  }

  async updateSubtask(payload, authUser) {
    const taskId = payload.taskId;
    delete payload.taskId;
    try {
      const task = await Task.findOneAndUpdate(
        {
          _id: taskId,
          owner: authUser,
        },
        payload,
        { new: true }
      );

      if (!task) throw new Error("Invalid reques");

      return task;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating subtasks");
    }
  }
}

module.exports = TaskService;
