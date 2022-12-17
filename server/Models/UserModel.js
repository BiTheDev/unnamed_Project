import mongoose from 'mongoose';



const userSchema = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    // birthday:{type:Date},
    email:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:String}
});

const User = mongoose.model('User',userSchema);


export default User;