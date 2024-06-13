import { Router } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/task.controller.js'
import verifyToken from "../middleware/verifyToken.js"
import validateSchema from '../middleware/validateSchema.js'
import { TaskSchemaJoi } from '../schemas/task.schema.js'
import ROLES from '../utils/roles.js'

const router = Router()

router.post('/',verifyToken([ROLES.ADMIN]),validateSchema(TaskSchemaJoi), createTask)
router.get('/',verifyToken([ROLES.ADMIN]), getTasks)
router.get('/:id',verifyToken([ROLES.ADMIN]), getTaskById)
router.put('/:id',verifyToken([ROLES.ADMIN]),validateSchema(TaskSchemaJoi), updateTask)
router.delete('/:id',verifyToken([ROLES.ADMIN]), deleteTask)



export default router;