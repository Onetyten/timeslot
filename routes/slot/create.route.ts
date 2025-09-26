import express from 'express'
import { createSlotController } from '../../controller/createSlot.controller'
const router = express.Router()

router.post("/create",createSlotController)
export default router