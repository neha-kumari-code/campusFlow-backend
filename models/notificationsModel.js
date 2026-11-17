import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        enum:["NEW_COMMENT","ISSUE_ASSIGNED","STATUS_CHANGED","ISSUE_RESOLVED"],
        default:"NEW_COMMENT"
    }
},{timestamps:true})

export const Notification = mongoose.models.Notification || mongoose.model('Notification',notificationSchema)