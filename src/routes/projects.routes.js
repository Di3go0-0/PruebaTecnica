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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operaciones relacionadas con los proyectos
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Projects]
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
 *               startDate:
 *                 type: string
 *                 format: date
 *                 required: true
 *               finalDate:
 *                 type: string
 *                 format: date
 *                 required: true
 *               state:
 *                 type: string
 *                 enum: [No started, In progress, Completed]
 *                 required: false
 *                 default: No started
 *             
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Error Updating Project
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       500:
 *         description: Error from the server
 */

router.post('/', validateSchema(ProjectJoi), createProject);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects obtained successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       500:
 *         description: Error from the server
 */
router.get('/', getProjects);
/**
 * @swagger
 * /projects/search:
 *   get:
 *     summary: Buscar proyectos por campo y contenido
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: Campo por el que se va a buscar
 *         schema:
 *           type: string
 *       - in: query
 *         name: content
 *         required: true
 *         description: Valor a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projects obtained successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: Projects not found
 *       500:
 *         description: Error from the server
 */
router.get('/search', seachProjects); // /projects/search?type=description&content=first : type es el campo por el que se va a buscar y content es el valor a buscar
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project obtained successfully
 *       401:
 *          description: Unauthorized
 *       403: 
 *          description: You don't have permission to access this resource  
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error from the server
 */

router.get('/:id', getProjectById);
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualizar un proyecto por ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto a actualizar
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
 *                 required: false
 *               desctiption:
 *                 type: string
 *                 required: false
 *               startDate:
 *                 type: string
 *                 format: date
 *                 required: false
 *               finalDate:
 *                 type: string
 *                 format: date
 *                 required: false
 *               state:
 *                 type: string
 *                 enum: [No started, In progress, Completed]
 *                 required: false
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Error Updating Project
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: You don't have permission to access this resource
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateSchema(UpdateProjectJoi), updateProject);
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You don't have permission to access this resource
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error from the server
 */
router.delete('/:id', deleteProject);

const projectsRoutes = (app) => app.use("/projects", router);
export default projectsRoutes;