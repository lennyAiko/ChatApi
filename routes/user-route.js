import express from "express";
import { getUsers, searchUser, modifyUser } from "../controllers/user-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'

const router = express.Router()

router.get('/', [auth, checkUser], getUsers)

router.post('/', [auth, checkUser], searchUser)

router.patch('/:id', [auth, checkUser], modifyUser)

export default router