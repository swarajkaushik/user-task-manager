const Joi = require("joi");

const subtaskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().iso().required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
});

const postTaskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().iso().required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
  subtasks: Joi.array().items(subtaskSchema).default([]),
});

module.exports = {
  postTaskSchema,
};
