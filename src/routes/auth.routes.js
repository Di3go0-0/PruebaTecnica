import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";
import validateSchema from "../middleware/validateSchema.js";
import { RegisterSchemaJoi, LoginSchemaJoi } from "../schemas/user.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de la autenticación
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Incorrect password
 
 */
router.post("/login", validateSchema(LoginSchemaJoi), loginController);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [admin, user]
 *                 required: false
 *     responses:
 *       201:
 *         description: User Created Successfully
 *       400:
 *         description: The email is already registered
 */
router.post("/register", validateSchema(RegisterSchemaJoi), registerController);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierre sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logoutController);

const authRoutes = (app) => app.use(router);

export default authRoutes;
