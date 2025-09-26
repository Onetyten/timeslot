import express from 'express'
import { refreshAccessToken } from '../../controller/refreshToken.controller'
const router = express.Router()

router.post("/token/access",refreshAccessToken)
export default router