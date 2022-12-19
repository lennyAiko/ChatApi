import express from "express";
import { createFriend, friendList, friendRequest, getFriendDetails, getFriends } from "../controllers/friends-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.get('/', auth, getFriends)

router.post('/', createFriend)

router.get('/requests', friendRequest)

router.get('/list', friendList)

router.get('/list/:id', getFriendDetails)

export default router