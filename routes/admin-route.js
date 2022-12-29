import express from 'express'
import { verifyToken as auth,  } from '../middleware/auth-middleware.js'
import { checkAdmin } from '../middleware/admin-middleware.js'
import { getApiKey, modifyAdmin } from '../controllers/admin-controller.js'
import { upload } from '../middleware/upload-middleware.js'

const router = express.Router()

router.patch('/modify', [auth, checkAdmin, upload.single('image')], modifyAdmin)

router.get('/apikey', [auth, checkAdmin], getApiKey)

export default router