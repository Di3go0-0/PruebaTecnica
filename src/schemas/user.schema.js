import Joi from 'joi';

const RegisterSchemaJoi = Joi.object({
  name: Joi.string()    // debe ser un string
    .min(2)               // longitud mínima de 2 caracteres
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Please, enter your name',
        'string.min': 'The name must be at least 2 characters long',
        'any.required': 'The name is required',
        }),
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Please, enter your email',
        'string.email': 'The email must be a valid email address',
        'any.required': 'The email is required',
        }),
  password: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .min(6)                   // longitud mínima de 6 caracteres
    .required()               // es obligatorio
    .messages({
        'string.empty': 'The password is empty',
        'string.min': 'The password must be at least 6 characters long',
        'any.required': 'The password is required',
        }),
  rol: Joi.string()    // debe ser un string
  .valid('user', 'admin')  // solo puede ser 'user' o 'admin'
  .default('user')   // por defecto es 'user'
  .messages({
      'string.empty': 'The role is empty',
      'any.only': 'The role can only be "user" or "admin"',
  }),
});

const LoginSchemaJoi = Joi.object({
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es obligatorio
    .messages({
        'string.empty': 'Please, enter your email',
        'string.email': 'The email must be a valid email address',
        'any.required': 'The email is required',
        }),
  password: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .required()               // es obligatorio
    .min(6)
    .messages({
        'string.empty': 'Please, enter your password',
        'any.required': 'The password is required',
        'string.min': 'The password must be at least 6 characters long',
        })
});

//Todos los datos solicitados son requeridos ya que se solicitó un PUT, por lo que se espera que se envíen todos los datos del usuario a actualizar.
const UpdateUserSchemaJoi = Joi.object({
  name: Joi.string()    // debe ser un string
    .min(2)               // longitud mínima de 2 caracteres
    .required()           // es requerido
    .messages({
        'string.min': 'The name must be at least 2 characters long',
        'any.required': 'The name is a required field',
        }),
  email: Joi.string()     // debe ser un string
    .email()              // debe ser un email válido
    .required()           // es requerido
    .messages({
        'string.email': 'The email must be a valid email address',
        'any.required': 'The email is a required field',
        }),
  password: Joi.string()    // debe ser un string
    .trim()                   // quita los espacios en blanco al principio y al final
    .min(6)                   // longitud mínima de 6 caracteres
    .required()               // es requerido
    .messages({
        'string.min': 'The password must be at least 6 characters long',
        'any.required': 'The password is a required field',
        }),
  rol: Joi.string()    // debe ser un string
    .valid('user', 'admin')  // solo puede ser 'user' o 'admin'
    .required()                 // es requerido
    .messages({
        'any.only': 'The role can only be "user" or "admin"',
        'any.required': 'The role is a required field',
    }),
});

export { RegisterSchemaJoi, LoginSchemaJoi, UpdateUserSchemaJoi };