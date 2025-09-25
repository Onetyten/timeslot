import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import mongoConnect from "./config/mongoConnect"
import createUserRoute from './routes/user/create.route'





const port = process.env.PORT 
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"client","dist")))

app.use ('/user',createUserRoute)


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