import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

app.use(express.json())

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((error)=>{s
    console.log('Could not connect to MongoDB',error)
})


app.use(router)
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
