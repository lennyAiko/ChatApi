import express from "express";
import { getUsers } from "../controllers/user-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.get('/', auth, getUsers)

export default router