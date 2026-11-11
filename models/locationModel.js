import mongoose from "mongoose"
const locationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["COMMON","DEPARTMENT","HOSTEL"],
        required:true
    },
    visibility:{
        type:String,
        enum:["HOSTEL","DEPARTMENT","GENDER","CAMPUS"],
        required:true
    },
    target:{
        gender:{
            type:String,
            enum:["MALE","FEMALE"],
        },
        department:{
            type:mongoose.Schema.Types.ObjectId,
            red:'Department'
        },
        hostel:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hostel'
        }
    }
})

export const Location=mongoose.models.Location || mongoose.model('Location',locationSchema)