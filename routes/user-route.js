import express from "express";
import { getUsers, searchUser } from "../controllers/user-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'

const router = express.Router()

router.get('/', [auth, checkUser], getUsers)

router.post('/', [auth, checkUser], searchUser)

export default router