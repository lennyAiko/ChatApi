import express from 'express'
import { userTotalMessages, userTotalFriends, totalMessages, totalUser, topUsers } from '../controllers/analytics-controller.js'
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.get('/total_messages', auth, userTotalMessages)

router.get('/total_friends', auth, userTotalFriends)

router.get('/all_messages', auth, totalMessages)

router.get('/total_users', auth, totalUser)

router.get('/top_users', auth, topUsers)

export default router