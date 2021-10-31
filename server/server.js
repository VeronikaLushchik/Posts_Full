require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const apiPort = 8080

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) 
    
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

app.use(express.json())
app.use(cors())

const postsRouter = require('./routes/posts')
app.use('/api', postsRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))