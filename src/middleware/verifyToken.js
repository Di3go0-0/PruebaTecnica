import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = (roles) => async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(403).json({ message: "Not loggen in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userEmail = decoded.email;
    const userEmail = req.userEmail;
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) return res.status(404).json({ message: "Unauthenticated" });

    req.user = user;

    if (!roles.includes(user.rol)) {
      return res
        .status(403)
        .json({ message: "You do not have permissions to access this resource" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default verifyToken;