import express from 'express'

import { adminLogin, adminRegister, userLogin, userRegister } from "../controllers/auth-controller.js"
import { upload } from '../middleware/upload-middleware.js'

const router = express.Router()

router.post('/user_register', upload.single('image'), userRegister)

router.post('/user_login', userLogin)

router.post('/admin_register', upload.single('image'), adminRegister)

router.post('/admin_login', adminLogin)

export default router
