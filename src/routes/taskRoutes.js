const express = require("express");
const { taskControllerIns } = require("../controllers/index");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth, async (req, res) => {
  const result = await taskControllerIns.postTask(req, res);
  return result;
});

router.get("/:taskId", auth, async (req, res) => {
  const result = await taskControllerIns.getTaskById(req, res);
  return result;
});

router.put("/:taskId", auth, async (req, res) => {
  const result = await taskControllerIns.updateTask(req, res);
  return result;
});

router.delete("/:taskId", auth, async (req, res) => {
  const result = await taskControllerIns.deleteTask(req, res);
  return result;
});

router.get("", auth, async (req, res) => {
  const result = await taskControllerIns.getAllTasks(req, res);
  return result;
});

module.exports = router;
