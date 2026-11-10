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
    class:{
        type:String,
        enum:["mess","library","hostel","department","wifi","canteen","stationary"],
        required:true
    },
    status:{
        type:String,
        enum:["reported","being_reviewed","staff_assigned","inProgess","resolved","rejected"],
        default:"reported",
        required:true
    }
},{timestamps:true})

export const Issue= mongoose.models.Issue || mongoose.model('Issue',issueSchema)