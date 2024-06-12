import Joi from 'joi';

const RegisterSchemaJoi = Joi.object({
  nombre: Joi.string()    // debe ser un string
    .min(2)               // longitud mínima de 2 caracteres
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Por favor, introduce tu nombre',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres',
        'any.required': 'El nombre es obligatorio',
        }),
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Por favor, introduce tu email',
        'string.email': 'El email debe ser un email válido',
        'any.required': 'El email es obligatorio',
        }),
  contrasena: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .min(6)                   // longitud mínima de 6 caracteres
    .required()               // es obligatorio
    .messages({
        'string.empty': 'Por favor, introduce tu contraseña',
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es obligatoria',
        }),
});

const LoginSchemaJoi = Joi.object({
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Por favor, introduce tu email',
        'string.email': 'El email debe ser un email válido',
        'any.required': 'El email es obligatorio',
        }),
  contrasena: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .required()               // es obligatorio
    .messages({
        'string.empty': 'Por favor, introduce tu contraseña',
        'any.required': 'La contraseña es obligatoria',
        }),
});

export { RegisterSchemaJoi, LoginSchemaJoi };