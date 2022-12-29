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

// template
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.use('/friends', friendRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)
app.use('/auth', authRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => res.send("Hello this is Chatify."))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))