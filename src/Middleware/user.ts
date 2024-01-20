import { NextFunction, Request, Response } from "express";
import Jwt from 'jsonwebtoken' ;
import { User } from "../Model/user";

export const Auth =async (req:Request,res:Response,next:NextFunction)=>{
    const {authToken,refreshToken} =req.cookies;
    
        if(!authToken || !refreshToken){
            return res.status(401).json({message : " Authentication Failed : No authToken or refreshToken is provided "})
        }
         
        Jwt.verify(authToken,`${process.env.TS_JWT_SECRET_KEY}`||"",(err:any,decode:any)=>{
            if(err){
                Jwt.verify(refreshToken,`${process.env.TS_JWT_REFRESH_SECRET_KEY}`||"",(refreshErr:any,refreshDecode:any)=>{
                    if(refreshErr){
                        return res.status(401).json({message : " Authentication Failed : Both tokens are invalid"}) ;
                    }else{
                        const newAuthToken = Jwt.sign({userId : refreshDecode.userId},`${process.env.TS_JWT_SECRET_KEY}` ||"",{expiresIn : '30m'});
                        const newRefreshToken = Jwt.sign({userId : refreshDecode.userId},`${process.env.TS_JWT_REFRESH_SECRET_KEY}` ||"",{expiresIn : '2h'})
            
                        res.cookie('authToken',newAuthToken,{httpOnly:true});
                        res.cookie('refreshToken',newRefreshToken,{httpOnly : true });
                        
                        const find_user = User.findById(refreshDecode.userId);
                        if(!find_user){
                            return res.status(400).send("You are not authenticated User");
                        }else{
                            req.userId=refreshDecode.userId;
                            next();
                        }
                    }
                })
            }else{

                const find_user = User.findById(decode.userId );
                        if(!find_user){
                            return res.status(400).send("You are not authenticated User");
                        }else{
                            req.userId=decode.userId;
                            next();
                        }
            }
        })
}

            