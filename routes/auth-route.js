import express from 'express'

import { userLogin, userRegister } from "../controllers/auth-controller.js"

const router = express.Router()

router.post('/register', userRegister)

router.post('/register', userLogin)

export default router
