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
})