import express from "express";
import { createFriend, friendList, friendRequest, getFriendDetails, getFriends } from "../controllers/friends-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'

const router = express.Router()

router.get('/', [auth, checkUser], getFriends)

router.post('/', [auth, checkUser], createFriend)

router.get('/requests', [auth, checkUser], friendRequest)

router.get('/list', [auth, checkUser], friendList)

router.get('/list/:id', [auth, checkUser], getFriendDetails)

export default router