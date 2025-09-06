import express from "express";
import jwt from "jsonwebtoken";
import {userSignUp,userLogin,allUsers, deleteUserById, deleteAllUsers} from "../controllers/usercontroller.js"
const router = express.Router();
export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message:"no token provided"});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();

    }catch(error){
        return res.status(403).json({message:"Invalid or expired token"});
    }
}

router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.get('/all',allUsers);
router.delete('/:id',deleteUserById);
router.delete('/delete/all',deleteAllUsers);

export default router;