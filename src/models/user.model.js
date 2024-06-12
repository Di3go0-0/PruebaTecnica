import {mongoose} from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String, // debe ser un string
      required: true,   // es obligatorio
      trim: true,    // quita los espacios en blanco al principio y al final
      minlength: 5, // longitud mínima de 5 caracteres
      maxlength: 15,    // longitud máxima de 15 caracteres
    },
    email: {
      type: String, // debe ser un string
      required: true,   // es obligatorio
      trim: true,   // quita los espacios en blanco al principio y al final
      unique: true, // no puede haber dos emails iguales
    },
    contrasena: {
      type: String,     // debe ser un string
      required: true,   // es obligatorio
      trim: true,   // quita los espacios en blanco al principio y al final
      minlength: 6, // longitud mínima de 6 caracteres
    
    },
  },
  {
    timestamps: true,       // añade fecha de creación y fecha de actualización
    versionKey: false,      // ignora el campo __v
  }
);

export default mongoose.model("User", UserSchema);