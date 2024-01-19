import mongoose from "mongoose";



const userSchema =new mongoose.Schema({
name:{
    type:String,
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true
},
intrest:{
    types:Array,
    default:[]
},jobs: {
    type: Array,
    default: [],
},
appliedJobs: {
    type: Array,
    default: []
}
});

export const User =mongoose.model('user',userSchema);



