import {Request,Response,NextFunction} from "express";
import {Job} from "../Model/job";
import {JobCategory} from "../Model/jobcategories";
import { User } from "../Model/user";
// import {sendMail} from '../Helper/sendMail';



//Create Job
export const createJob =async (req:Request,res:Response,next:NextFunction)=>{

    const {userId} =req;
    const {title,description,categoryName}=req.body;

    const find_category=await JobCategory.findOne({categoryName});

    try{
        const created_job= new Job({
            title,
            description,
            categoryName,
            owner:userId,
        });
       const job_result=await created_job.save();

       if(find_category){
          find_category.jobs.push(created_job._id);
          find_category.save();

          

          next();
        //   res.status(200).json({job_result,find_category});
       }else{
            const created_job_category=new JobCategory({categoryName})
            const array_intrested_users=created_job_category.jobs.push(created_job._id);
            const cat_result = await created_job_category.save();

            

            next();
            // res.status(200).json({job_result,cat_result});
       }
    }catch(err){
        res.status(400).send("Error In Creating a Job In Database");
    }
}



//Applied Job
export const applyJob = async(req:Request,res:Response)=>{
    const {id}=req.params;
    const {userId} =req;
    try{
        const result = await Job.findById(id);
        if(result){
         result?.ppl_Applied.push(userId);
        }
        await result?.save();
     
        const rez=await User.findById(userId);
        rez?.appliedJobs.push(id);
        await rez?.save();
         res.status(200).send({result});
    }catch(e){
        res.status(400).send(e)
    }
   
//   
}

//Okay Tested Email Is Sending