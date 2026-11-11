import mongoose from "mongoose";

const staffSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    department:{
        type:String,
        default:null
    },
    designation:{
        type:String,
        default:null
    }
})

export const Staff=mongoose.models.Staff || mongoose.model('Staff',staffSchema)