import { User } from "../models/usersModel";
import { googleClient } from "../config/google";
import jwt from "jsonwebtoken"
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

