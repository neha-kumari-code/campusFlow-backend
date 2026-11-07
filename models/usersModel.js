import mongoose, { Schema } from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    profileImg:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["student","staff","admin"],
        default:"student"
    },
    contact:{
        type:String
    }
})

export const User=  mongoose.models.User || mongoose.model('User',userSchema)