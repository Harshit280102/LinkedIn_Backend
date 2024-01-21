import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { User } from '../Model/user';

export const nmail =async (userid:any,categoryName:any,title:any,description:any)=>{

    const userdb:any | null=await User.findById(userid);
    const email:string =userdb?.email;
    const name:string =userdb?.name;


    let config={
        service:'gmail',
        auth:{
        user:process.env.TS_GMAIL,
        pass:process.env.TS_PASS,
        }
    }
    
    let transporter=nodemailer.createTransport(config);
    
    transporter.verify(function(error, success) {
    if (error) {
    console.log(error);
    } 
    else 
    {
    console.log('Server is ready to take our messages');
    }
    });
    let MailGenerator =new Mailgen({
    theme:"default",
    product:{
        name:"Harshit's Server For Job",
        link:"https://mailgen.js"
    }
    })
    
    let response ={
    body:{
    name:title,
    intro:description,
    table:{
    data:[{
    item:'New Job',
    description:`There is a new job`,
    }]},
    outro:"Looking Forward to do more business"
    }
    }
    
    let mail = MailGenerator.generate(response);
    
    let message ={
    from:process.env.TS_GMAIL,
    to: email,
    subject:`New Job From ${categoryName}`,
    text:`Hi ${name}, This Is Your Email for new job creation`,
    html:mail,
    }
    
    transporter.sendMail(message).then(()=>{
    console.log("Notification for Job Is Send !!");       
    }).catch(e=>{
    console.log(e);
    })
}

