import { Request,Response } from "express";
import userProfile from "../schema/user.schema";
import jwt from "jsonwebtoken";
import mongoConnect from "../config/mongoConnect";


export async function refreshAccessToken(req:Request,res:Response) {

    const secret = process.env.JWT_SECRET
    if (!secret){
        throw new Error("Add a jwt secret to the .env file")
    }
    const {refreshToken} = req.body
    if (!refreshToken){
        return res.status(400).json({message:"No refresh token provided",success:false})
    }
    await mongoConnect()
    try {
        const user = await userProfile.findOne({"refreshToken.token":refreshToken})
        if (!user){
            return res.status(401).json({message:"Token either does not exist or has expired",success:false})
        }
        const matchedToken = user.refreshToken.find(t =>t.token === refreshToken)
        if (!matchedToken){
            return res.status(401).json({message:"Token either does not exist or has expired",success:false})
        }
        if ( new Date(matchedToken.expiresAt) < new Date()){
            user.refreshToken.pull({token:refreshToken})
            await user.save()
            return res.status(401).json({message:"Refresh Token has expired, redirecting to log in page.",success:false})
        }
        const payload = {id:user._id}
        const token = jwt.sign(payload,secret,{expiresIn:'6h'})
        return res.status(200).json({message:"New token Assigned",data:token,success:true})
    } catch (error) {
        console.log("An unexpected error occurred while refreshing tokens. Please try again later.")
        res.status(500).json({message:"An unexpected error occurred. Please try again later.",error,success:false})
    }
}