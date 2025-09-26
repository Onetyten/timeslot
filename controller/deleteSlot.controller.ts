import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import timeSlot from "../schema/slot.schema";


export async function deleteSlotController(req:Request,res:Response) {
    await mongoConnect()
    const userId = req.userId
    try {
        const {id:slotId} = req.params
        const slotExists = await timeSlot.findById(slotId)
        if (!slotExists){
            return res.status(404).json({message:"This slot does not exist",success:false})
        }
        if (slotExists.userId.toString() !== userId){
            return res.status(401).json({message:"Not authorized",success:false})
        }
        const deletedSlot = await timeSlot.findByIdAndDelete(slotId)
        return res.status(200).json({message:"Timeslots deleted",data:deletedSlot, success:true})
    }
    catch (error) {
        console.log(`error deleting timeslot ${error}`)
        return res.status(500).json({message:"Internal server error",error,success:false})
    }
}