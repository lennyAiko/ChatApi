import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import friendRoutes from './routes/friends-route.js'
import userRoutes from './routes/user-route.js'
import messageRoutes from './routes/message-route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("DB connected.")
})

app.use(bodyParser.json())

// routes
app.use('/friends', friendRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

app.get('/', (req, res) => res.send("Hello this is Chatify."))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))