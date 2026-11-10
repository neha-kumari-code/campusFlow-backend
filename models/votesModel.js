import mongoose, { Schema } from "mongoose";

const voteSchema= new mongoose.Schema({
    issue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const Vote=mongoose.models.Vote || mongoose.model('Vote',voteSchema)