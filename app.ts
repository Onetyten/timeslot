import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"




const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"client","dist")))


app.get("/api/hello",(req:Request,res:Response)=>{
    res.json({message:"Hello there"})
})


app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})


const port = process.env.PORT 
app.listen(port,()=>{
    console.log(`timeslot running on port ${port}`)
})