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
import { TaskSchemaJoi } from '../schemas/task.schema.js'
import ROLES from '../utils/roles.js'

const router = Router()

router.post('/',verifyToken([ROLES.ADMIN, ROLES.USER]),validateSchema(TaskSchemaJoi), createTask)
router.get('/',verifyToken([ROLES.ADMIN, ROLES.USER]), getTasks)
router.get('/search',verifyToken([ROLES.ADMIN, ROLES.USER]), searchTasks); // /tasks/search?type=description&content=first : type es el campo por el que se va a buscar y content es el valor a buscar
router.get('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]), getTaskById)
router.put('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]),validateSchema(TaskSchemaJoi), updateTask)
router.delete('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]), deleteTask)

const taskRoutes = (app) => app.use("/task", router);

export default taskRoutes

