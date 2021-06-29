import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRoute from './routes/users.js'

dotenv.config()

mongoose.connect(process.env.MONGO)

const app = express()

app.use(bodyParser.json())

app.use('/users', userRoute)

app.listen(process.env.PORT, () => {
  console.log('start')
})
