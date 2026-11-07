import mongoose, {Schema } from "mongoose";

const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    issue:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Issue",
       required:true 
    }
})

export const Comment= mongoose.models.Comment || mongoose.model('Comment',commentSchema)