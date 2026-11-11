import { promises } from "nodemailer/lib/xoauth2";
import { connectCloudinary } from "../config/cloudinary"

const uploadToCloudinary=async(file)=>{
    try {
        const result= await connectCloudinary.uploader.upload(file.path,{
            folder:"campus-flow/issues",
            resource_type:"auto"
        })
        return result;
    } catch (error) {
        console.log(`error while uploading to cloudinary ${error}`)
        throw error;
    }
}

export const uploadMultiFilesToCloud=async(files)=>{
    try {
        const result=await Promise.all((file)=>uploadToCloudinary(file))  
        return result; 
    } catch (error) {
         console.log(`error while uploading multiple files to cloudinary ${error}`)
        throw error;
    } 
}