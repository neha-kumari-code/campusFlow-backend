import mongoose, {Schema } from "mongoose";

const hostelSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:["MALE","FEMALE"],
        reuqired:true
    }
},{timestamps:true})

export const Hostel= mongoose.models.Hostel || mongoose.model('Hostel',hostelSchema)