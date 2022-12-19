import express from "express";
import { createFriend, friendList, friendRequest, getFriendDetails, getFriends } from "../controllers/friends-controller.js";
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.get('/', auth, getFriends)

router.post('/', auth, createFriend)

router.get('/requests', auth, friendRequest)

router.get('/list', auth, friendList)

router.get('/list/:id', auth, getFriendDetails)

export default router