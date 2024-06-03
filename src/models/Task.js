const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const subtaskSchema = new Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  isDeleted: { type: Boolean, default: false },
});

const taskSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  isDeleted: { type: Boolean, default: false },
  subtasks: [subtaskSchema],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
