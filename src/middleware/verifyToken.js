import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = (roles) => async (req, res, next) => {
  console.log("cookies ", req.cookies);
  try {
    const { token } = req.cookies;
    if (!token) return res.status(403).json({ message: "No logueado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    const userId = String(req.userId.id);
    const user = await User.findByPk(userId);
    console.log("id", req.userId);
    if (!user) return res.status(404).json({ message: "No autentificado" });

    req.user = user;

    if (!roles.includes(user.rol)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para acceder a este recurso" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "No Autorizado" });
  }
};
