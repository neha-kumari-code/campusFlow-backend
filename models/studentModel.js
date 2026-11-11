import mongoose, { Schema } from "mongoose";

const studentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rollNumber:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    hostel:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
})

export const Student=mongoose.models.Student || mongoose.model('Student',studentSchema)