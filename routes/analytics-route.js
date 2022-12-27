import express from 'express'
import { userTotalMessages, userTotalFriends, totalMessages, totalUser, topUsers } from '../controllers/analytics-controller.js'
import { verifyToken as auth,  } from '../middleware/auth-middleware.js'
import { checkAdmin } from '../middleware/admin-middleware.js'

const router = express.Router()

router.get('/total_messages', [auth, checkAdmin], userTotalMessages)

router.get('/total_friends', [auth, checkAdmin], userTotalFriends)

router.get('/all_messages', [auth, checkAdmin], totalMessages)

router.get('/total_users', [auth, checkAdmin], totalUser)

router.get('/top_users', [auth, checkAdmin], topUsers)

export default router