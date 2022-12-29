import express from "express";

import { getUsers, searchUser, modifyUser } from "../controllers/user-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'
import { upload } from '../middleware/upload-middleware.js'
import { cache } from "../middleware/cache-middleware.js"

const router = express.Router()

router.get('/', [auth, checkUser], getUsers)

router.post('/search', [auth, checkUser, cache(10)], searchUser)

router.patch('/modify', [auth, checkUser, upload.single('image')], modifyUser)

export default router