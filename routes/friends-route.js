import express from "express";
import { createFriend, friendList, friendRequest, getFriendDetails, getFriends } from "../controllers/friends-controller.js";

const router = express.Router()

router.get('/', getFriends)

router.post('/', createFriend)

router.get('/requests', friendRequest)

router.get('/list', friendList)

router.get('/list/:id', getFriendDetails)

export default router