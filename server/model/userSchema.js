const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    email:{ type: String, required: true, unique: true },
    password:String,
    verificationcode:String,
    isVerified:String,
    token:String,
    ForgetToken:String,
})


const userModel= new mongoose.model('User',userSchema)
module.exports=userModel