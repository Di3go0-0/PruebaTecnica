import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import verifySelf from "../middleware/verifySelf.js";
import validateSchema from "../middleware/validateSchema.js";
import { UpdateUserSchemaJoi } from "../schemas/user.schema.js";
import ROLES from "../utils/roles.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       500:
 *         description: Error from the server
 */
router.get("/", verifyToken([ROLES.ADMIN]), getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User obtained successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: The user does not exist
 *       500:
 *         description: Error from the server
 */
router.get("/:id", verifyToken([ROLES.ADMIN, ROLES.USER]), verifySelf, getUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
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
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: The user does not exist
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/:id",
  verifyToken([ROLES.ADMIN, ROLES.USER]),
  validateSchema(UpdateUserSchemaJoi),
  verifySelf,
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: The user does not exist
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/:id",
  verifyToken([ROLES.ADMIN, ROLES.USER]),
  verifySelf,
  deleteUser
);

const usersRoutes = (app) => app.use("/users", router);

export default usersRoutes;
