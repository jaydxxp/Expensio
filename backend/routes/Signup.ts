import express, { Request, Response } from "express";
import mongoose from "mongoose";
import z from "zod"
import jwt from "jsonwebtoken";
import { User } from "../model/AuthModel";
const router=express.Router();
router.use(express.json())
const BodySignup=z.object({
    name:z.string(),
    username:z.string(),
    email:z.string().email(),
    password:z.string().min(3).max(12)
})
router.post("/signup",async (req:Request,res:Response)=>{
    const {success}=BodySignup.safeParse(req.body);
    if(!success)
    {
        return res.status(403).json({
            message:"Please Write Values in Correct Format"
        })
    }
    const ExistingUser= await User.findOne({
        username:req.body.username,
        email:req.body.email
    })
    if(ExistingUser)
    {
        return res.status(403).json({
            message:"This User Already Exist"
        })
    }
    const user=await User.create({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email

    })
    const userid=user._id;
    const token=jwt.sign({
        userid
    },process.env.JWTSecret!);
    return res.json({
        message:"Account Created Successfully",user,token
    })

})
export default router;