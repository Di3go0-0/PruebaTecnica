// app.js
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/task.routes.js";

import setupSwagger from "./swagger.js";

const app = express();


app.use(morgan("dev")); //para ver las peticiones que llegan al servidor
app.use(express.json()); //para que el servidor entienda los json que llegan al servidor
app.use(cookieParser()); //para que el servidor entienda las cookies que llegan al servidor

setupSwagger(app); // Configurar Swagger

authRoutes(app); // Montar rutas de autenticación
userRoutes(app); // Montar rutas de usuarios
projectRoutes(app); // Montar rutas de proyectos
taskRoutes(app); // Montar rutas de tareas

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
}); // para que cuando no encuentre la ruta, devuelva un mensaje de error

export default app;
