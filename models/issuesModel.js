import mongoose, { Schema } from "mongoose";

const issueSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    visibility: {
        type: String,
        enum: [
            "HOSTEL",
            "DEPARTMENT",
            "GENDER",
            "CAMPUS"
        ],
        required: true
    },
    target: {
        hostel: String,
        department: String,
        gender: String
    },
    location:{
        type:String,
        required:true
    },
    media:[{
        type:{
            type:String,
            enum:["photo","video"],
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        enum:["mess","library","hostel","department","wifi","canteen","stationary"],
        required:true
    },
    status:{
        type:String,
        enum:["reported","being_reviewed","staff_assigned","inProgess","resolved","rejected"],
        default:"reported",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    }
},{timestamps:true})

export const Issue= mongoose.models.Issue || mongoose.model('Issue',issueSchema)