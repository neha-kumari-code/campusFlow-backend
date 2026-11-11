import multer from "multer"

const fileFilter=(req,file,cb)=>{
        const allowedTypes=["image/jpeg","image/png","image/webp","image/jpg","video/mp4","video/webm","video/quicktime"];
        if(allowedTypes.includes(file.mimetype)){
            // cb(error,acceptThisFile)
            cb(null,true)
        }else{
            cb(new error("only photos and videos are allowed"))
        }
}
const storage= multer.memoryStorage();
export const upload=multer({
    Storage,
    fileFilter,
    limits:{
        files:5,
        fileSize:50*1024*1024
    }
})