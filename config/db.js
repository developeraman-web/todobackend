import mongoose from "mongoose";
let uri = "mongodb+srv://amansharmapwl:aman@cluster0.fwzuw18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async ()=>{
    try{
        await mongoose.connect(uri);
        console.log("mongo db connected");
    } catch (error){
        console.log('mongo db connection error', error);
        process.exit(1);

    }
};
export default connectDb;
