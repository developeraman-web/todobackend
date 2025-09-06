import express from "express";
import cors from "cors";
import taskroutes from "./routes/taskroutes.js";
import authroutes, { verifyToken } from "./routes/userroutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({override:true})
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/tasks",verifyToken,taskroutes);
app.use("/api/auth",authroutes); // the request which starts with /api/auth send them to authroutes
app.get('/',(req,res)=>{
    res.send('to-do backend is running');
})

connectDb();


app.listen(8080,()=>{
    console.log(`${process.env.port}`);
})