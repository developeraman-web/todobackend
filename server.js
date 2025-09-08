import express from "express";
import cors from "cors";
import taskroutes from "./routes/taskroutes.js";
import authroutes, { verifyToken } from "./routes/userroutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({override:true})
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// processing time middleware

// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     console.log(`${req.method} ${req.originalUrl} - ${Date.now() - start}ms`);
//   });
//   next();
// });


// Tasks routes
app.use("/api/tasks",verifyToken,taskroutes);

// auth routes
app.use("/api/auth",authroutes); 

// basic get request to check if server is running
app.get('/',(req,res)=>{
    res.send('to-do backend is running');
})

// Db connection 
connectDb();


app.listen(8080,()=>{
    console.log(`${process.env.port}`);
})