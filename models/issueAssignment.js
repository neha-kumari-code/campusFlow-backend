import mongoose from "mongoose";

const issueAssignmentSchema=new mongoose.Schema({
    issue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue',
        required:true
    },
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const issueAssignmentModel= mongoose.models.IssueAssign || mongoose.model('IssueAssign',issueAssignmentSchema)