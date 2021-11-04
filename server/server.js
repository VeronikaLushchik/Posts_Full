require('dotenv').config()

const express = require('express')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/users')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) 
    
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

app.use(express.json())
app.use(cors())

app.use('/api', postsRouter)
app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))