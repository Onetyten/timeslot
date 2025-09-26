import express from 'express'
import { fetchSlotController } from '../../controller/fetchSlots.controller'
const router = express.Router()

router.get("/fetch",fetchSlotController)
export default router