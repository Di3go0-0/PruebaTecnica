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

router.post('/', validateSchema(TaskSchemaJoi), createTask)
router.get('/', getTasks)
router.get('/search', searchTasks)
router.get('/:id', getTaskById)
router.put('/:id', validateSchema(UpdateTaskSchemaJoi), updateTask)
router.delete('/:id', deleteTask)

const taskRoutes = (app) => app.use("/tasks", router);

export default taskRoutes