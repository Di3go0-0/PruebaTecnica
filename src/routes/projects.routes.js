import { Router } from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    seachProjects
} from "../controllers/project.controller.js";
import verifyToken from "../middleware/verifyToken.js"
import validateSchema from '../middleware/validateSchema.js'
import { ProjectJoi , UpdateProjectJoi} from '../schemas/project.schema.js'
import ROLES from '../utils/roles.js'



const router = Router();

router.use(verifyToken([ROLES.ADMIN, ROLES.USER]));

router.post('/', validateSchema(ProjectJoi), createProject);
router.get('/', getProjects);
router.get('/search', seachProjects); // /projects/search?type=description&content=first : type es el campo por el que se va a buscar y content es el valor a buscar
router.get('/:id', getProjectById);
router.put('/:id', validateSchema(UpdateProjectJoi), updateProject);
router.delete('/:id', deleteProject);

const projectsRoutes = (app) => app.use("/projects", router);
export default projectsRoutes;