import { NextFunction, Request, Response } from "express";
import { AuthUser, User } from "./model/AuthModel";
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      userId?: string;
    }
  }
}


export default async function AuthMiddleware(req:Request,res:Response,next:NextFunction)
{
    try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWTSecret!);


    const userId = decoded?.userid ?? decoded?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    req.userId = user._id?.toString?.() ?? String(user._id);
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
export {};