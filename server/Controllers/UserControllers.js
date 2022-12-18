import User from "../Models/UserModel.js";
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

        const token = jwt.sign({email:existUser.email, id:existUser._id}, 'test', {'expiresIn':"1h"});

        res.status(200).json({result:existUser,token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}


export const register = async (req,res) =>{
    const {firstName, lastName,email,password,confirmPassword, profileImage} = req.body;
    console.log(req.body.firstName);
    try {
        const existingUser = await User.findOne({email});

        if(existingUser)return res.status(400).json({message: "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password:hashedPassword, firstName,lastName, profileImage});

        const token = jwt.sign({email:result.email, id: result._id}, 'test', {expiresIn:"1h"});

        res.status(200).json({result: result, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

// export const editUser = async (req, res) {
//     const { id: _id} = req.params;
//     const user = req.body;

//     try {
         // const updatedUser = await findByIdAndRemove()

         // const isPasswordSame = await bcrypt.compare(password,updatedUser.password);
        // if(!isPasswordSame){

         // }
//         if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);

         // const hashedPassword = await bcrypt.hash(password, 12);

//         res.status(200).json({result: result, token});
//     } catch (error) {
//         res.status(500).json({message: "Something went wrong"});
//     }
// }

export const deleteUser = async(req,res) => {

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);

    res.json({message: 'User deleted successfully'});

}