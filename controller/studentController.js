import { User } from "../models/usersModel.js";
import { googleClient } from "../config/google.js";
import jwt from "jsonwebtoken"
import { Issue } from "../models/issuesModel.js";
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

const getAllUnresolvedIssues=async()=>{
    try {
        const unresolvedIssues=await Issue.find({status:{
            $nin:["resolved","rejected"]
        }}).sort({createdAt:-1})
        return res.json({
            success:true,
            unresolvedIssues
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

const getLatest3UnresolvedIssues=async()=>{
    try {
        const getLatest3Iss=await Issue.find({status:{
            $nin:["resolved","rejected"]
        }}).sort({createdAt:-1}).limit(3);
        return res.json({
            success:true,
            getLatest3Iss
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
        const {title,description,section}=req.body
        if(!title || !description || !section){
            return res.json({
                success:false,
                message:"details missing"
            })
        }
        const media=req.files
        if(media){
            
        }
    } catch (error) {
        
    }
}

export {google, getAllUnresolvedIssues, getLatest3UnresolvedIssues}