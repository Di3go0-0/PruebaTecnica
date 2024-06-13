import Joi from "joi";

export const ProjectJoi = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Project name is empty",
    "any.required": "Project name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Project description is empty",
    "any.required": "Project description is required",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "Start date is not valid, it must be in YYYY-MM-DD format",
    "any.required": "Start date is required",
  }),
  finalDate: Joi.date().required().messages({
    "date.base": "End date is not valid, it must be in YYYY-MM-DD format",
    "any.required": "Final date is required",
  }),
  state: Joi.string()
    .valid("No started", "In progress", "Completed")
    .default("No started")
    .messages({
      "string.empty": "Project state is empty",
      "any.only":
        'Project state can only be "No started", "In progress", or "Completed"',
    }),
    // userId is not included because it is automatically generated in the controller with the logged in user
});