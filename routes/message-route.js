import express from 'express'
import { createMessage, filterMessage, getReceiverMessage, getSenderMessage, modifyMessage } from '../controllers/message-controller.js'
import { verifyToken as auth } from '../middleware/auth-middleware.js'

const router = express.Router()

router.post('/', auth, createMessage)

router.get('/receiver/:id', auth, getReceiverMessage)

router.get('/sender/:id', auth, getSenderMessage)

router.patch('/:id', auth, modifyMessage)

router.get('/', auth, filterMessage)

export default router