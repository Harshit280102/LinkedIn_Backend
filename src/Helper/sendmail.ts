import { NextFunction, Request, Response } from "express";
import { JobCategory } from "../Model/jobcategories";
import { User } from "../Model/user";
import { nmail } from "./nodemailer";


export const sendMail =async (req:Request,res:Response)=>{
    // const {userId}=req;
    const {title,description,categoryName,}=req.body;

    const cat_job = await JobCategory.findOne({categoryName});

    const cat=cat_job?.interestedUsers;

    cat?.map((userid)=>{
        nmail(userid,categoryName,title,description);
    })

    res.send("Email Is Send To Intrested User");
}

//Okay Tested Email Is Sending