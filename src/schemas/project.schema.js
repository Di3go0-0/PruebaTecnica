import Joi from "joi";

//Como necesitoamos actualizar con el metodo put, podemos usar el mismo esquema que para crear un proyecto

export const ProjectJoi = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del proyecto está vacío",
    "any.required": "El nombre del proyecto es obligatorio",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripción del proyecto está vacía",
    "any.required": "La descripción del proyecto es obligatoria",
  }),
  fechaInicio: Joi.date().required().messages({
    "date.base": "La fecha de inicio no es válida, debe estar en formato YYYY-MM-DD",
    "any.required": "La fecha de inicio es obligatoria",
  }),
  fechaFin: Joi.date().required().messages({
    "date.base": "La fecha de fin no es válida, debe estar en formato YYYY-MM-DD",
    "any.required": "La fecha de fin es obligatoria",
  }),
  estado: Joi.string()
    .valid("no iniciado", "en progreso", "completado")
    .default("no iniciado")
    .messages({
      "string.empty": "El estado del proyecto está vacío",
      "any.only":
        'El estado del proyecto solo puede ser "no iniciado", "en progreso" o "completado"',
    }),
    //No se introduce el usuarioId porque se genera automaticmaente en el controlador con el usuario que está logueado
});
