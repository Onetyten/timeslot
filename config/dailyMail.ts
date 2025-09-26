import nodeCron from "node-cron";
import nodemailer from 'nodemailer'




export async function dailyCron() {
    nodeCron.schedule('* * * * *',()=>{
        console.log(`hello the time is ${new Date()}`)
    })
    
}