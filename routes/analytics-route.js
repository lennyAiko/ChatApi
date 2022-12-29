import express from 'express'

import { userTotalMessages, userTotalFriends, totalMessages, totalUser, topUsers } from '../controllers/analytics-controller.js'
import { verifyToken as auth,  } from '../middleware/auth-middleware.js'
import { checkAdmin } from '../middleware/admin-middleware.js'
import { cache } from "../middleware/cache-middleware.js"

const router = express.Router()

router.get('/total_messages', [auth, checkAdmin, cache(10)], userTotalMessages)

router.get('/total_friends', [auth, checkAdmin, cache(10)], userTotalFriends)

router.get('/all_messages', [auth, checkAdmin, cache(10)], totalMessages)

router.get('/total_users', [auth, checkAdmin, cache(10)], totalUser)

router.get('/top_users', [auth, checkAdmin, cache(10)], topUsers)

export default router