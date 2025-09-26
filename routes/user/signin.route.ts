import express from 'express'
import { signInController } from '../../controller/signIn.controller'
const router = express.Router()

router.post('/signin',signInController)

export default router