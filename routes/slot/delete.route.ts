import express from 'express'
import { deleteSlotController } from '../../controller/deleteSlot.controller'
const router = express.Router()

router.delete("/delete/:id",deleteSlotController)
export default router