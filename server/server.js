require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/users')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT
const error = require('./middleware/errors')

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
    
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use('/api', userRouter)
app.use('/api', postsRouter)
app.use(error);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))