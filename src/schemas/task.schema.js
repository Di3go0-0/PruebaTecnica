import Joi from "joi";

export const TaskSchemaJoi = Joi.object({
  id: Joi.number().integer(),
  nombre: Joi.string().required().messages({
    "string.empty": "Introduce el nombre de la tarea",
    "any.required": "El nombre es obligatorio",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "Introduce la descripción de la tarea",
    "any.required": "La descripción es obligatoria",
  }),
  fechaCreacion: Joi.date(),
  fechaActualizacion: Joi.date(),
  estado: Joi.string()
    .valid("pendiente", "en progreso", "completada")
    .required()
    .messages({
      "string.empty": "Introduce el estado de la tarea",
      "any.only":
        'El estado de la tarea debe ser "pendiente", "en progreso" o "completada"',
      "any.required": "El estado es obligatorio",
    }),
  proyectoId: Joi.number().integer().required().messages({
    "number.base": "El proyectoId debe ser un número",
    "any.required": "El proyectoId es obligatorio",
  }),
});
