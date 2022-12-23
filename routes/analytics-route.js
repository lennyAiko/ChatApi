import express from 'express'
import { totalFriends, totalMessages } from '../controllers/analytics-controller.js'
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.get('/total_messages', auth, totalMessages)

router.get('/total_friends', auth, totalFriends)

export default router