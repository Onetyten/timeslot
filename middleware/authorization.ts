import { NextFunction, Request,Response } from "express";
import Jwt, {TokenExpiredError } from "jsonwebtoken";




async function Authorization(req:Request,res:Response,next:NextFunction){
    const secret = process.env.JWT_SECRET
    if (!secret){
        throw new Error("Add a jwt secret to the .env file")
    }
    const authHeader = req.headers.authorization
    if (!authHeader){
        return res.status(401).json({message:`Sign in or create an account`,success:false})
    }
    if (!authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:`Sign in or create an account`,success:false})
    }
    const token  = authHeader.split(" ")[1]
    try {
        const decoded = Jwt.verify(token,secret )
        if (typeof decoded === "string"){
            return res.status(401).json({message:"Invalid token payload",success:false})
        }
        req.userId = decoded.id
        next()   
    } catch (error) {
        console.log(error)
        if (error instanceof TokenExpiredError){
            return res.status(401).json({message:`Access token expired, please refresh`,error:"TokenExpiredError", code: "TOKEN_EXPIRED",success:false})
        }
        else{
            return res.status(401).json({message:`Error during authorization: ${error instanceof Error? error.message:""}`,error:error})
        }
    }
}

export default Authorization