import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    name:{type:String,required:true},
    completed:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.Number,ref:"User",required:true}
    
},{timestamps:true});
taskSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id; // removes _id from the response if you don’t want to show it
  }
});
const Task = mongoose.model("task",taskSchema);
export default Task;