import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const userSignUp = async (req,res)=>{
    try{
        const {userId,userName,password,email} = req.body;
        const existingUser = await User.findOne({email:email});
        if(existingUser) return res.status(400).json({error:"user already exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({userId,userName,password:hashedPassword,email});
        await newUser.save();
        res.status(201).json({message:"user registerd successfully"});

    } catch(error){
        res.status(500).json({errorIs:error.message})
    }
}

export const userLogin = async (req,res)=>{
   try{
     const {email,password} = req.body;
    const userExist = await User.findOne({email:email});
    
    if(!userExist){
        res.status(401).json({message:"user not found"});
    }
    const matchPass = await bcrypt.compare(password,userExist.password);
    if(!matchPass) {
        res.status(400).json({message:"Invalid Details!"});
    }

    const token = jwt.sign(
        {id:userExist.userId,email:userExist.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1h'}
    );
    
    res.json({token,user:{id:userExist.userId,email:userExist.email,userName:userExist.userName}});

   }catch(err){
    res.status(500).json({message:"server error"});
   }



}

export const allUsers = async (req,res)=>{
    try{
        const users = await User.find();
        if(!users.length){
            res.status(404).json({message:"no users entered"})
        }
        res.status(201).send(users);
    }catch(error){
        res.status(500).json({error: `${error}`});
    }
}

export const deleteUserById = async (req,res)=>{
    try{
        const {id} = req.params;
        const userExist = await User.findOne({userId:id});
        if(!userExist) {
            res.status(404).json({message:"user not found"});
        }

        const userDeleted = await User.deleteOne({userId:id});
        res.status(200).send(userDeleted);

    }catch(error){
        res.status(500).json({message:"something went wrong in deleting user by id"});
    }
}

export const deleteAllUsers = async (req,res)=>{
    try{
        const areUsersPresent = await User.find();
        if(!areUsersPresent.length){
             res.status(404).json({message:"no user found so nothing gets deleted "})
        }
        const users = await User.deleteMany();
        res.status(200).json({message:"all users deleted successfully"})
    }catch(error){
        res.status(400).json({message:"something went wrong in deleting all users"});
       
    }
}



