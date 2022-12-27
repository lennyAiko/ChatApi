import express from 'express'
import { createMessage, filterMessage, getReceiverMessage, getSenderMessage, modifyMessage } from '../controllers/message-controller.js'
import { verifyToken as auth } from '../middleware/auth-middleware.js'
import { checkUser } from '../middleware/user-middleware.js'
import { upload } from '../middleware/upload-middleware.js'

const router = express.Router()

router.post('/', [auth, checkUser, upload.single('image')], createMessage)

router.get('/receiver/', [auth, checkUser], getReceiverMessage)

router.get('/sender/', [auth, checkUser], getSenderMessage)

router.patch('/:id', [auth, checkUser], modifyMessage)

router.get('/filter/:id', [auth, checkUser], filterMessage)

export default router