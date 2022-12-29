import express from "express"

import { createFriend, friendList, friendRequest, getFriendDetails, getFriends } from "../controllers/friends-controller.js"
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'
import { cache } from "../middleware/cache-middleware.js"

const router = express.Router()

router.get('/', [auth, checkUser, cache(10)], getFriends)

router.post('/', [auth, checkUser], createFriend)

router.get('/requests', [auth, checkUser, cache(10)], friendRequest)

router.get('/list', [auth, checkUser, cache(10)], friendList)

router.get('/list/:id', [auth, checkUser, cache(10)], getFriendDetails)

export default router