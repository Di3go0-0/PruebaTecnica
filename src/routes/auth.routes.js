import { Router } from "express";
import {
    registerController,
    loginController,
    logoutController,

} from '../controllers/auth.controller.js';
import validateSchema from '../middleware/validateSchema.js';
import { RegisterSchemaJoi, LoginSchemaJoi } from '../schemas/user.schema.js';

const router = Router();

router.post("/login", loginController);

router.post("/register",validateSchema(RegisterSchemaJoi), registerController)

router.post("/logout", logoutController);

export default router;