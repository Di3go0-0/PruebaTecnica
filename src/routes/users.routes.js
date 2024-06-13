import { Router } from "express";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js";
import {verifyToken} from "../middleware/verifyToken.js"
import { verifySelf } from "../middleware/verifySelf.js";
import validateSchema from '../middleware/validateSchema.js'
import {UpdateUserSchemaJoi} from '../schemas/user.schema.js'

const router = Router();

const ROLES = {
    ADMIN: 'admin',
    USER: 'usuario'
  };


router.get('/',verifyToken([ROLES.ADMIN, ROLES.USER]), getUsers);
router.get('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]),verifySelf, getUser);
router.put('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]),validateSchema(UpdateUserSchemaJoi),verifySelf, updateUser);
router.delete('/:id',verifyToken([ROLES.ADMIN, ROLES.USER]),verifySelf, deleteUser);


export default router;