import mongoose from "mongoose";

const jobCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique:true
    },
    jobs:{
        type:Array,
        default:[]  
    },
    interestedUsers:{
        type:Array,
        default:[]
    }
})

export const JobCategory = mongoose.model("jobCategory", jobCategorySchema);
