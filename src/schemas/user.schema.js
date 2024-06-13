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
  rol: Joi.string()    // debe ser un string
  .valid('usuario', 'admin')  // solo puede ser 'user' o 'admin'
  .default('usuario')   // por defecto es 'user'
  .messages({
      'string.empty': 'El rol está vacío',
      'any.only': 'El rol solo puede ser "user" o "admin"',
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
    .min(6)
    .messages({
        'string.empty': 'Por favor, introduce tu contraseña',
        'any.required': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        })
});

//Todos los datos solicitados son requeridos ya que se solicitó un PUT, por lo que se espera que se envíen todos los datos del usuario a actualizar.
const UpdateUserSchemaJoi = Joi.object({
  nombre: Joi.string()    // debe ser un string
    .min(2)               // longitud mínima de 2 caracteres
    .required()           // es requerido
    .messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'any.required': 'El nombre es un campo requerido',
        }),
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es requerido
    .messages({
        'string.email': 'El email debe ser un email válido',
        'any.required': 'El email es un campo requerido',
        }),
  contrasena: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .min(6)                   // longitud mínima de 6 caracteres
    .required()               // es requerido
    .messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es un campo requerido',
        }),
  rol: Joi.string()    // debe ser un string
    .valid('usuario', 'admin')  // solo puede ser 'user' o 'admin'
    .required()                 // es requerido
    .messages({
        'any.only': 'El rol solo puede ser "user" o "admin"',
        'any.required': 'El rol es un campo requerido',
    }),
});

export { RegisterSchemaJoi, LoginSchemaJoi, UpdateUserSchemaJoi };