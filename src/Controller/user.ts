import { RequestHandler,Request,Response } from "express";
import bcryptjs from "bcryptjs";
import  Jwt from "jsonwebtoken";
import { User } from '../Model/user';
import {JobCategory} from '../Model/jobcategories';
import {Job} from '../Model/job';




//Create User
export const registerUser:RequestHandler=async(req:Request,res:Response)=>{
 const {name,email,password,intrest} =req.body;

 let user=await User.findOne({email:req.body.email});
 if(user) {return res.status(400).send("User already Registered ")};

 try{
    const hashpass= bcryptjs.hashSync(password, 10);
    console.log(hashpass);
    console.log(req.body)
   

    const create_user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpass,
        intrest:req.body.interest
    });

    await create_user.save();

    const name:String = req.body.name;
    console.log(`${name} is Created Into The Database `);
    res.status(200).json(create_user);
 }catch(e){
    console.log('Error in Creating User In the Database!');
    res.status(400).json(e);
 }
}

//SignIn User
export const signInUser:RequestHandler=async(req:Request,res:Response)=>{
    try{
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({
            message: "Please provide all credentials...",
        })};
    
        const user =await User.findOne({email});
    
        const testpass:any= user?.password
        if(!user){
            return res.status(400).json({
                message: "User does not exist...",
            });
        }else{
            const validPassword =bcryptjs.compareSync(password,testpass);
            if(!validPassword){
                return res.status(403).json({ message: "Wrong Password...",});
            }
        }
    
        const authToken = Jwt.sign(
            { userId: user._id },
            `${process.env.TS_JWT_SECRET_KEY}` || ""
        );
    
        const refreshToken = Jwt.sign(
            { userId: user._id },
           `${process.env.TS_JWT_REFRESH_SECRET_KEY}` ||""
        );
    
       
        res.cookie("authToken", authToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.status(200).json({ message: "Login Successfully...", userId: user._id });
    }catch(err){
        return res.status(400).send("Error in SignIn");
    }

}

export const logout = async (req:Request, res:Response) => {
    try {
      res.clearCookie("authToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({
        message: "Logout Successfully..",
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
};


//createIntrest

export const createIntrest =async (req:Request,res:Response)=>{
    const {intrest} =req.body;
    const {userId} =req;

    const user =await User.findById(userId);
    const jobcategory =await JobCategory.findOne({categoryName:intrest});
    if(!user || !jobcategory){
        return res.status(400).send("User or Job is Not in the Database !!");
    }else{
        user.intrest.push(intrest);
        jobcategory.interestedUsers.push(userId);
    }
    const save=await user.save();
    const catsave=await jobcategory.save();

    res.status(200).json({save,catsave});
}
