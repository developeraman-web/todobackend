import mongoose from "mongoose";
let uri = "mongodb+srv://amansharmapwl:aman@cluster0.fwzuw18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let isConnected = false;
const connectDb = async ()=>{
    if(isConnected) return;
   
     try{
        await mongoose.connect(uri);
        isConnected = true;
    } catch (error){
        isConnected = false;
        process.exit(1);

    }
 
};
export default connectDb;
