const userController = require("./userController");
const tasksController = require("./taskController");

const userControllerIns = new userController();
const taskControllerIns = new tasksController();

module.exports = {
  userControllerIns,
  taskControllerIns,
};
