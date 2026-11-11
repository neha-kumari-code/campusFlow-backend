import express from "express"
import { createIssue, getAllUnresolvedIssues, getIssue, getLatest3UnresolvedIssues, google } from "../controller/studentController.js"
import { upload } from "../middleware/upload.js"
import { authStudent } from "../middleware/studentMiddleware.js"

const userRouter= express.Router()

userRouter.post("/login",google)
userRouter.post("/unresolved",authStudent, getAllUnresolvedIssues)
userRouter.post("/unresolved/latest",authStudent,getLatest3UnresolvedIssues)
userRouter.post("/create",authStudent,upload.array("media",5),createIssue)
userRouter.get("/get/:issueId",authStudent,getIssue)
export default userRouter