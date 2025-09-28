import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Joi from "joi";
import bcrypt from "bcrypt"
import userProfile from "../schema/user.schema";
import { MongoServerError } from "mongodb";

const JoiUserSchema = Joi.object({
    name:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
})

export async function createUser(req:Request,res:Response) {
    await mongoConnect()
    const {error,value} = JoiUserSchema.validate(req.body)
    if (error){
        console.log(error.message)
        return res.status(400).json({message:`invalid input ${error.message}`,error,success:false})
    }
    const {name,email,password} = value

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = new userProfile({name:name.toLowerCase(),email:email.toLowerCase(),password:hashedPassword})
        const savedUser = await user.save()
        console.log(`User ${user.name} created`)
        const payload = {
            name:savedUser.name,
            email:savedUser.email
        }
        return res.status(201).json({message:`User ${user.name} created`,data:payload,success:true})
    }
    
    catch (error) {
        console.log("error creating profile",error)
        if (error instanceof MongoServerError &&  error.code === 11000){
            return res.status(500).json({message:`Email already exists, please log in`,error,success:false})
        }
        return res.status(500).json({message:`Error creating profile, please try again`,error,success:false})
    }
}