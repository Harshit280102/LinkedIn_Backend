import mongoose from "mongoose";



const jobSchema =new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
categoryName:{
    types:String,
    required:true
},owner:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
},
ppl_Applied: {
    type:[String],
    default: []
}
});

export const Job =mongoose.model('job',jobSchema);



