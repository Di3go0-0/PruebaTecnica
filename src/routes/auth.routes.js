import { Router } from "express";
import {
    registerController,
    loginController,
    logoutController,

} from '../controllers/auth.controller.js';
import validateSchema from '../middleware/validateSchema.js';
import { RegisterSchemaJoi, LoginSchemaJoi } from '../schemas/user.schema.js'


const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in.
 *       400:
 *         description: Missing or invalid user details.
 *       401:
 *         description: Incorrect email or password.
 */
router.post("/login",validateSchema(LoginSchemaJoi), loginController);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created.
 *       400:
 *         description: Missing or invalid user details.
 *       409:
 *         description: Email already in use.
 */
router.post("/register",validateSchema(RegisterSchemaJoi), registerController)

router.post("/logout", logoutController);

const authRoutes = (app) => app.use(router);

export default authRoutes;