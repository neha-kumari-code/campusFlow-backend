import mongoose, {Schema } from "mongoose";

const departmentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})

export const Department= mongoose.models.Department || mongoose.model('Department',departmentSchema)