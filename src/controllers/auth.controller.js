import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const registerController = async (req, res) => {
  const { name, email, password, rol } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (userFound)
      return res.status(400).json({ message: "The email is already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      rol,
    });

    const userSaved = await newUser.save();
    console.log(newUser);

    res.status(201).json({
      _id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      password: userSaved.password,
      rol: userSaved.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound)
      return res.status(400).json({ message: "The email is not registered" });

    const matchPassword = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ email: email });
    res.cookie("token", token); //guardamos el token en una cookie

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
