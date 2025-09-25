import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";


export async function createUser(req:Request,res:Response) {
    await mongoConnect()
    try {
        return res.status(201).json({message:"Hello there"})
    } catch (error) {
        
    }
}