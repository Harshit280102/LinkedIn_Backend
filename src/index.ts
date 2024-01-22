import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


import {registerUser,signInUser,logout,createIntrest} from "./Controller/user";
import {createJob,applyJob} from "./Controller/job";
import { Auth } from './Middleware/user';
import { sendMail } from './Helper/sendmail';
// import {} from "./Controller/u"


const app=express();
dotenv.config();

declare global{
    namespace Express {
        interface Request{
            userId?:Object,
        }
    }
}

const connection =process.env.TS_MONGODB_CONNECTION;


app.use(express.json());
app.use(cors({
    credentials:true,
}))
app.use(cookieParser());
app.use(bodyParser.json());




app.get("/",(req,res)=>{res.send("JOB PORTAL")})
app.post("/register",registerUser);
app.post("/signin",signInUser);
app.get("/logout",logout)
app.post("/createintrest",Auth,createIntrest);
app.post("/createjob",Auth,createJob,sendMail);
app.get("/apply/:id",Auth,applyJob);

app.get("/test",sendMail);




app.listen(process.env.TS_PORT,async()=>{
    await connect_to_db(connection);
    console.log(`Server is Running at Port ${process.env.TS_PORT}`)
})

async function connect_to_db(connection:string |undefined){
    if(typeof connection!== "string"){
        console.log(`Error In Connecting Database To Server Due TO wrong Connection Key `);
        return;
    }
    try{ 
        await mongoose.connect(connection);
        console.log(`Database Is Connecting To Server:${process.env.TS_PORT} `);
    }catch(e){
        console.log(`Error In Connecting Database To Server:${process.env.TS_PORT} `);
        }
    }

//Okay Tested Email Is Sending