import { Router } from "express";
import {
    registerController,
    loginController,
    logoutController,

} from '../controllers/auth.controller.js';
import validateSchema from '../middleware/validateSchema.js';
import { RegisterSchemaJoi, LoginSchemaJoi } from '../schemas/user.schema.js'

const router = Router();

router.post("/login",validateSchema(LoginSchemaJoi), loginController);
router.post("/register",validateSchema(RegisterSchemaJoi), registerController)
router.post("/logout", logoutController);

const authRoutes = (app) => app.use(router);

export default authRoutes;