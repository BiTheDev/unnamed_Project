import mongoose from 'mongoose';



const userSchema = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    // birthday:{type:Date},
    profileImage: String,
    email:{type:String, required:true},
    password:{type:String, required:true},
    createdAt: {
        type: Date,
        default: new Date()
    },
    id:{type:String}
});

const User = mongoose.model('User',userSchema);


export default User;