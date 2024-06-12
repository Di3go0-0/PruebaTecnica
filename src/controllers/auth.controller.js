import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const newUser = new User({
      nombre,
      email,
      contrasena : contrasenaHash,
    });

    const userSaved = await newUser.save();
    console.log(newUser);

    res.status(201).json({
      _id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
      contrasena: userSaved.contrasena,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, contrasena } = req.body;
  try{
    const userFound = await User.findOne({ email })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const logoutController = async (req, res) => {
  res.json({ message: "Logout page" });
}