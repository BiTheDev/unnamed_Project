import User from "../Models/UserModel";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const login = async (req,res) =>{
    const {email,password} = req.body;

    try {
        const existUser = await User.findOne({email});

        if(!existUser){
            return res.status(404).json({message: "User not found, Please register"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existUser.password);

        if(!isPasswordCorrect){
            return res.status(404).json({message: "Invalid username or password, please try again"});
        }

        const token = jwt.sign({email:existUser.email, id:existUser._id}, 'asfasfsadfsdf', {'expiresIn':"1h"});

        res.status(200).json({result:existUser,token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}


export const register = async (req,res) =>{
    const {email,password, firstName, lastName, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser)return res.status(400).json({message: "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password:hashedPassword, firstName,lastName});

        const token = jwt.sign({email:result.email, id: result._id}, 'test', {expiresIn:"1h"});

        res.status(200).json({result: result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const editUser = async (req, res) {

}

export const deleteUser = async(req,res) {
    
}