import { Request, Response } from "express";
import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import timeSlot from "../schema/slot.schema";


const slotJoiSchema = Joi.object({
    name :Joi.string().required(),
    email: Joi.when('type', {
        is: 'birthday',
        then: Joi.string().email().required(),
        otherwise: Joi.string().optional().allow("")
    }),
    type: Joi.string().valid('birthday','event').required(),
    eventDate: Joi.date().greater('now').required(),
    relationship:Joi.string().optional().allow("")
})

export async function createSlotController(req:Request,res:Response) {
    const {value,error} = slotJoiSchema.validate(req.body)
    if (error){
        console.log(error)
        return res.status(400).json({message:`Invalid input ${error.message}`,error,success:false})
    }
    const {name,email,type,eventDate,relationship} = value
    await mongoConnect() 
    const userId = req.userId
    try {
        const slotExists = await timeSlot.findOne({userId,email,type:'birthday'})
        if (slotExists && type == 'birthday'){
            return res.status(409).json({message:'Duplicate slots not allowed',success:false})
        }
        // const newSlot = new timeSlot({userId, name,email,type,eventDate:Date.now() + 1000*60*60*7,relationship})
        const newSlot = new timeSlot({userId, name,email,type,eventDate,relationship})
        await newSlot.save()
        return res.status(201).json({message:"New time slot created",data:newSlot.toObject(),success:true})
    }
    catch (error) {
        console.log(`error creating timeslot ${error}`)
        return res.status(500).json({message:"Internal server error",error,success:false})
    }
    
}