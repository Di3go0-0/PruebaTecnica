import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import sequelize from "../database/db.js";

export const registerController = async (req, res) => {
  const { nombre, email, contrasena, rol } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (userFound)
      return res.status(400).json({ message: "El email ya está registrado" });

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const newUser = new User({
      nombre,
      email,
      contrasena: contrasenaHash,
      rol,
    });

    const userSaved = await newUser.save();
    console.log(newUser);

    res.status(201).json({
      _id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
      contrasena: userSaved.contrasena,
      rol: userSaved.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound)
      return res.status(400).json({ message: "El email no está registrado" });

    const matchPassword = await bcrypt.compare(
      contrasena,
      userFound.contrasena
    );

    if (!matchPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound.id });
    res.cookie("token", token); //guardamos el token en una cookie

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout exitoso" });
};
