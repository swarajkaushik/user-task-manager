const Joi = require("joi");

const subtaskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().iso().required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
  isDeleted: Joi.boolean(),
});

const postTaskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().iso().required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
  subtasks: Joi.array().items(subtaskSchema).default([]),
});

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const fetchByIdTaskSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required(),
});

const updateTaskSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required(),
  subject: Joi.string(),
  deadline: Joi.date().iso(),
  status: Joi.string().valid("pending", "completed").default("pending"),
});

const deleteTaskSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required(),
  isDeleted: Joi.boolean().required(),
});

const fetchSubTaskSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required(),
});

const updateSubtaskSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required(),
  subtasks: Joi.array().items(subtaskSchema).default([]).required(),
});

module.exports = {
  postTaskSchema,
  fetchByIdTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  fetchSubTaskSchema,
  updateSubtaskSchema,
};
