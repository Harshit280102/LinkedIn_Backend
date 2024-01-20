import {Request,Response} from "express";
import {Job} from "../Model/job";
import {JobCategory} from "../Model/jobcategories";


export const createJob =async (req:Request,res:Response)=>{
    const {userId} =req;
    const {title,description,categoryName}=req.body;

    try{
        const created_job= new Job({
            title,
            description,
            categoryName,
            owner:userId,
        });
       const job_result=await created_job.save();


       if(job_result){
        const created_job_category=new JobCategory({
            categoryName:job_result.categoryName,
        })
        const cat_result = await created_job_category.save();

        res.status(200).json({job_result,cat_result});
       }else{
        
        res.status(400).send("Error In Creating a Job Category In Database");
       }
    }catch(err){
        res.status(400).send("Error In Creating a Job In Database");
    }
}

