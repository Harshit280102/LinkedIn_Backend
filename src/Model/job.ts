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
    type:String,
    required:true
},owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
},
ppl_Applied: {
    type:Array,
    default: []
}
});

export const Job =mongoose.model('job',jobSchema);



