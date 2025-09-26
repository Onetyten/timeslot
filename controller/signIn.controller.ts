import dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Joi, { date } from "joi";
import userProfile from "../schema/user.schema";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from 'crypto'


const userValidationSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
})

export async function signInController(req:Request,res:Response) {
    await mongoConnect()
    const secret = process.env.JWT_SECRET
    if (!secret){
        return console.log("Add a jwt secret to the .env file")
    }

    const {error, value} = userValidationSchema.validate(req.body)
    if (error){
        console.log(error.message)
        return res.status(400).json({message:`Invalid input ${error.message}`, error, success:false})
    }
    const {email,password} = value

    try {
        const user = await userProfile.findOne({email})
        if (!user){
            console.log(`user ${email} does not exist`)
            return res.status(404).json({message:"This user does not exist, sign up to create a timeslot account"})
        }
        const match = await bcrypt.compare(password,user.password)
        if (!match){
            console.log(`user ${email} password incorrect`)
            return res.status(400).json({message:"Incorrect password"})
        }
        const payload = {id:user._id}
        const refreshToken = crypto.randomBytes(40).toString('hex')
        const expiresAt = new Date(Date.now()+ 1000 * 60 * 60 * 24 * 30)
        const token = jwt.sign(payload,secret,{expiresIn:'6h'})
        user.refreshToken.push({token:refreshToken,expiresAt})
        const {password:_pw, ...safeUser} = user.toObject()
        await user.save()
        console.log(`user ${user.name} signed in`)
        return res.status(200).json({message:`Signed in, welcome ${user.name}`,data:safeUser,token,success:true})
    }

    catch (error) {
       console.log(error)
       return res.status(500).json({message:"Internal server error", error:error instanceof Error? error.message:"Unknown error",success:false}) 
    }
    
}