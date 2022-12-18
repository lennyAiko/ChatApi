import express from 'express'
import { createMessage, getReceiverMessage, getSenderMessage, modifyMessage } from '../controllers/message-controller.js'

const router = express.Router()

router.post('/', createMessage)

router.get('/receiver/:id', getReceiverMessage)

router.get('/sender/:id', getSenderMessage)

router.patch('/:id', modifyMessage)

export default router