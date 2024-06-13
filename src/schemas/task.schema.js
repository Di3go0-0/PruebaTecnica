import Joi from "joi";

export const TaskSchemaJoi = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().required().messages({
    "string.empty": "Please enter the task name",
    "any.required": "Task name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Please enter the task description",
    "any.required": "Task description is required",
  }),
  creationDate: Joi.date(),
  updateDate: Joi.date(),
  state: Joi.string()
    .valid("Pending", "In progress", "Completed")
    .default("Pending")
    .messages({
      "any.only":
        'Task state must be "Pending", "In progress" or "Completed"'
    }),
  projectId: Joi.number().integer().required().messages({
    "number.base": "ProjectId must be a number",
    "any.required": "projectId is required",
  }),
});