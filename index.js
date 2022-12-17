import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5050

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Hello this is Chatify."))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))