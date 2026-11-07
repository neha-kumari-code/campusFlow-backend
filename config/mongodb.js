import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
export const connect=async ()=>{
    try {
        const url=`${process.env.MONGODB_URL}/campusFlow`
        await mongoose.connect(url)
    } catch (error) {
        console.log(`mongo db connection error ${error}`)
    }
}