import { Router } from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.controller.js";
import verifyToken from "../middleware/verifyToken.js"
import validateSchema from '../middleware/validateSchema.js'
import { ProjectJoi } from '../schemas/project.schema.js'
import ROLES from '../utils/roles.js'



const router = Router();

router.post('/',verifyToken([ROLES.ADMIN, ROLES.USER]),validateSchema(ProjectJoi), createProject);
router.get('/',verifyToken([ROLES.ADMIN, ROLES.USER]), getProjects);
router.get('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]), getProjectById);
router.put('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]),validateSchema(ProjectJoi), updateProject);
router.delete('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]), deleteProject);

export default router