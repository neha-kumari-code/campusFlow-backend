import express from "express"
import { connect } from "./config/mongodb.js"
import cors from 'cors'
import userRouter from "./routes/userRouter.js"
import { connectCloudinary } from "./config/cloudinary.js"
const app=express()
const port=process.env.PORT || 8000
connect()
connectCloudinary()
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})