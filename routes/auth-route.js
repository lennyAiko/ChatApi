import express from 'express'

import { adminLogin, adminRegister, getToken, userLogin, userRegister } from "../controllers/auth-controller.js"

import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.post('/user_register', auth, userRegister)

router.post('/user_login', auth, userLogin)

router.post('/admin_register', adminRegister)

router.post('/admin_login', adminLogin)

router.get('/getToken', auth, getToken)

export default router
