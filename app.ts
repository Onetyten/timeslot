import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import mongoConnect from "./config/mongoConnect"
import createUserRoute from './routes/user/signup.route'
import signInRoute from './routes/user/signin.route'
import refreshAccessTokenRoute from './routes/user/refreshToken.route'
import createSlotRoute from './routes/slot/create.route'
import fetchSlotRoute from './routes/slot/fetch.route'
import deleteSlotRoute from './routes/slot/delete.route'
import Authorization from "./middleware/authorization"
import { dailyCron } from "./config/dailyMail"



declare module "express-serve-static-core"{
    interface Request{
        userId?: string
    }
}

const port = process.env.PORT 
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"client","dist")))

dailyCron()

app.use('/user', createUserRoute)
app.use('/user', signInRoute)
app.use('/user', refreshAccessTokenRoute)
app.use('/slot',Authorization)
app.use('/slot',createSlotRoute)
app.use('/slot',fetchSlotRoute)
app.use('/slot',deleteSlotRoute)


app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

async function startServer() {
    try {
        console.log("connecting to db")
        await mongoConnect()
        console.log("connected to db")
        app.listen(port,(error)=>{
            if (!error){
                console.log(`timeslot running on port ${port}`)
            }
            else
            {
                console.log(`timeslot has runn into an error: ${error}`)
            }
            
        })
    } 
    catch (error) {
        console.log(`Failed to connect to server: ${error}`)
    }
}

startServer()