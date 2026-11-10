import express from "express"
import { getAllUnresolvedIssues, getLatest3UnresolvedIssues, google } from "../controller/studentController.js"

const userRouter= express.Router()

userRouter.post("/login",google)
userRouter.post("/unresolved",getAllUnresolvedIssues)
userRouter.post("/unresolved/latest",getLatest3UnresolvedIssues)

export default userRouter