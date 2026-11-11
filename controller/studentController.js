import { User } from "../models/usersModel.js";
import { googleClient } from "../config/google.js";
import jwt from "jsonwebtoken"
import { Issue } from "../models/issuesModel.js";
import { uploadMultiFilesToCloud } from "../utils/upload2Cloud.js";
import { Location } from "../models/locationModel.js";
import {  getVisibilityFilter } from "../utils/filteration.js";
const google=async(req,res)=>{
    try {
        const {googleIdToken}=req.body;
        if(!googleIdToken){
            return res.status(401).json({
                success:false,
                message:"credentials is required!"
            })
        }
        const ticket=await googleClient.verifyIdToken({
            idToken:googleIdToken,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const payload=ticket.getPayload();
        const {sub:googleId,name,email,picture,email_verified}=payload;
        if(!email || !email_verified){
            return res.status(400).json({
                success:false,
                message:"Google gmail is required!"
            })
        }
       
        let user=await User.findOne({googleId})
        if(!user){
            // we have to create the user
            const detail={
                name,email,googleId,profileImg:picture || "",role:"student"
            }
            user=await User.create(detail)
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            maxAge:7*24*60*60*1000,
            sameSite: "lax"
        })
        return res.status(200).json({
            success:true,
            message:"logged in successfully!",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`error while login/register ${error.message}`
        })
    }
}

const getAllUnresolvedIssues=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
       
        const filter={
           ...getVisibilityFilter(user),
            status:{
                $nin:["resolved","rejected"]
            }
        }
        const issues=await Issue.find(filter).sort({createdAt:-1})
        return res.json({
            success:true,
            issues
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

const getLatest3UnresolvedIssues=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
       
        const filter={
           ...getVisibilityFilter(user),
            status:{
                $nin:["resolved","rejected"]
            }
        }
        const issues=await Issue.find(filter).sort({createdAt:-1}).limit(3);
        return res.json({
            success:true,
            issues
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

const createIssue=async(req,res)=>{
    try {
        const {title,description,category,locationId}=req.body
        if(!title || !description || !category || !location){
            return res.json({
                success:false,
                message:"details missing"
            })
        }
        const media=req.files;
        const uploadedFile=await uploadMultiFilesToCloud(media);
        const files=uploadedFile.map((f)=>{
            url:f.secure_url
        })
        const location= await Location.findById(locationId)
        await Issue.create({
            title,
            category,
            description,
            locationId,
            media:files,
            visibility:location.visibility,
            target:location.target,
            status:'pending',
            createdBy:req.body.userId
        })
        return res.json({
            success:true,
            message:"Issue created!"
        })
    } catch (error) {
        
    }
}

const getIssue=async(req,res)=>{
    try {
        const {issueId}=req.params;
        const userId=req.user.id;
        const user=await User.findById(userId);
         if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    
        const issue=await Issue.findOne({_id:issueId, ...getVisibilityFilter(user)}).select("-visibility -target -createdBy")
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }
        return res.json({
            success:true,
            issue
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export {google, getAllUnresolvedIssues, getLatest3UnresolvedIssues,createIssue,getIssue} 