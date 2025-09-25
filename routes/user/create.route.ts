import express from'express'
const router = express.Router()
import { createUser } from '../../controller/createUser.controller'

router.post('/create',createUser)

export default router