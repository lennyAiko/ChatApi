import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import friendRoutes from './routes/friends-route.js'
import userRoutes from './routes/user-route.js'
import messageRoutes from './routes/message-route.js'
import authRoutes from './routes/auth-route.js'
import analyticsRoutes from './routes/analytics-route.js'
import adminRoutes from './routes/admin-route.js'

dotenv.config()

const app = express()
const {PORT, MONGO_URL} = process.env

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("DB connected.")
})

app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
app.use(express.static('static'))
app.use('/favicon_io', express.static('static/favicon_io'));

// routes
app.use('/friends', friendRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)
app.use('/auth', authRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => res.status(200).send(`
Hi, welcome to chatlify. <br>
This is a ChatAPI that can be consumed by developers who want to create chat applications. <br>
You can find the endpoints and discussion on my ReadME: https://github.com/lennyAiko/ChatApi
`))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))