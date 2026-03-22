import express from "express"
import { login, logOut, signup, verifyToken } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logOut)
authRouter.get("/verify", verifyToken) // ✅ Add this

export default authRouter
