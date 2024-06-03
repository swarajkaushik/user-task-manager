const express = require("express");
const { taskControllerIns } = require("../controllers/index");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  const result = await taskControllerIns.postTask(req, res);
  return result;
});

router.get("/getById/:taskId", auth, async (req, res) => {
  const result = await taskControllerIns.getTaskById(req, res);
  return result;
});

module.exports = router;
