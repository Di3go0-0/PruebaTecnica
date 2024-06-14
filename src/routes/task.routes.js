import { Router } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    searchTasks
} from '../controllers/task.controller.js'
import verifyToken from "../middleware/verifyToken.js"
import validateSchema from '../middleware/validateSchema.js'
import { TaskSchemaJoi, UpdateTaskSchemaJoi} from '../schemas/task.schema.js'
import ROLES from '../utils/roles.js'

const router = Router()

router.use(verifyToken([ROLES.ADMIN, ROLES.USER]));
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones relacionadas con las tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 requered: true
 *               description:
 *                 type: string
 *                 required: true
 *               state:
 *                 type: string
 *                 enum: [Pending, In progress, Completed]
 *                 required: false
 *                 default: Pending
 *             
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Error creating task
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       500:
 *         description: Error From Server
 */
router.post('/', validateSchema(TaskSchemaJoi), createTask)
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks obtained successfully
 *       401: 
 *          description: Unauthorized
 *       403:
 *        description: You don't have permission to access this resource
 *       500:
 *         description: Error from the server
 */
router.get('/', getTasks)
/**
 * @swagger
 * /tasks/search:
 *   get:
 *     summary: Buscar tareas por nombre o descripción
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: Campo por el que se va a buscar (nombre o descripción)
 *         schema:
 *           type: string
 *       - in: query
 *         name: content
 *         required: true
 *         description: Valor a buscar en el campo especificado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: You don't have permission to access this resource
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error from the server
 */
router.get('/search', searchTasks) 
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task obtained successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error from the server
 */
router.get('/:id', getTaskById)
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
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
 *                 requered: false
 *               description:
 *                 type: string
 *                 required: false
 *               state:
 *                 type: string
 *                 enum: [Pending, In progress, Completed]
 *                 required: false
 *                 default: false
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Error updating task
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error form the server
 */
router.put('/:id', validateSchema(UpdateTaskSchemaJoi), updateTask)
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *        description: Unauthorized
 *       403:
 *       description: You don't have permission to access this resource
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error from the server
 */

router.delete('/:id', deleteTask)

const taskRoutes = (app) => app.use("/tasks", router);

export default taskRoutes