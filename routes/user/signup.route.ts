import express from'express'
const router = express.Router()
import { createUser } from '../../controller/signUp.controller'

router.post('/signup',createUser)

export default router