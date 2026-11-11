import jwt from "jsonwebtoken"

export const authStudent=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({
                success:false,
                message:"invalid token"
            })
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decodedToken;
        next()
    } catch (error) {
        return res.json({
            success:false,
            message:`error while authing student ${error.message}`
        })
    }
}