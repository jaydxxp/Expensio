import express, { Request, Response } from "express";
import z from "zod"
import jwt from "jsonwebtoken"
import { User } from "../model/AuthModel";
import dotenv from "dotenv"
dotenv.config()
const router=express.Router();
router.use(express.json())
const SigninBody=z.object({
    email:z.string().email(),
    password:z.string().min(3).max(12)
})
router.post("/signin",async (req:Request,res:Response)=>{
    const {success}= SigninBody.safeParse(req.body);
    if(!success)
    {
        return res.status(403).json({
            message:"Enter Valid Details"
        })
    }
    const user =await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(!user)
    {
        return res.status(403).json({
            message:"User Doesn't Exist"
        })
    }
     const token=jwt.sign({
            userid:user._id
        },process.env.JWTSecret!)
    
    return res.json({
        message:"Logged in Successfully",user,token
    })
})
export default router;