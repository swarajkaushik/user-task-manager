const userService = require("./userService");
const taskService = require("./taskService");

const userServiceIns = new userService();
const taskServiceIns = new taskService();

module.exports = { userServiceIns, taskServiceIns };
