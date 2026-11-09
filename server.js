import express from "express"
import { connect } from "./config/mongodb.js"

const app=express()

connect()


app.listen(8000,()=>{
    console.log("server running on port")
})