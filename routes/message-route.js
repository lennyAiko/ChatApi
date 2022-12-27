import express from 'express'
import { createMessage, filterMessage, getReceiverMessage, getSenderMessage, modifyMessage } from '../controllers/message-controller.js'
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'

const router = express.Router()

router.post('/', [auth, checkUser], createMessage)

router.get('/receiver/:id', [auth, checkUser], getReceiverMessage)

router.get('/sender/:id', [auth, checkUser], getSenderMessage)

router.patch('/:id', [auth, checkUser], modifyMessage)

router.get('/filter', [auth, checkUser], filterMessage)

export default router