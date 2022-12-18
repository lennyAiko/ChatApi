import express from 'express'
import { createMessage, getReceiverMessage, getSenderMessage } from '../controllers/message-controller.js'

const router = express.Router()

router.post('/', createMessage)

router.get('/receiver/:id', getReceiverMessage)

router.get('/sender/:id', getSenderMessage)

export default router