import express from 'express'

import { adminLogin, adminRegister, userLogin, userRegister } from "../controllers/auth-controller.js"

const router = express.Router()

router.post('/user_register', userRegister)

router.post('/user_login', userLogin)

router.post('/admin_register', adminRegister)

router.post('/admin_login', adminLogin)

export default router
