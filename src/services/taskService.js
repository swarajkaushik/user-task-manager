const Task = require("../models/Task");

class TaskService {
  async postTask(payload, authUser) {
    try {
      const finalPayload = { ...payload, owner: authUser };
      const task = await Task.create(finalPayload);
      return task;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;
