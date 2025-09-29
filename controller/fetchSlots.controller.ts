import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import timeSlot from "../schema/slot.schema";




export async function fetchSlotController(req:Request,res:Response) {
    await mongoConnect()
    const userId = req.userId
    try {
        const timeSlots = await timeSlot.find({userId})
        if (timeSlots.length === 0){
            return res.status(200).json({message:"No timeslots found",success:true})
        }
        return res.status(200).json({message:"Timeslots fetched",data:timeSlots, success:true})
    }
    catch (error) {
        console.log(`error fetching timeslots ${error}`)
        return res.status(500).json({message:"Internal server error",error,success:false})
    }
}