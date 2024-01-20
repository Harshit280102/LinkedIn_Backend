import mongoose from "mongoose";

const jobCategorySchema = new mongoose.Schema({
    categoryName:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref:"Job",
    },
    interestedUsers:{
        type:Array,
        default: []
    }
})

export const JobCategory = mongoose.model("jobCategory", jobCategorySchema);
