import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    userId:{type:Number,required:true,unique:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true}

    

},{timestamps:true});
export default mongoose.model("User",userSchema);

