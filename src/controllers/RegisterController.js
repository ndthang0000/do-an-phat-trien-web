const argon2=require('argon2')
const publicFolder=require('../../public/url')
const User=require('../database/models/User')


const index=async(req,res)=>{
    res.sendFile(publicFolder+'/html/register.html')
}
const create=async(req,res)=>{
    const {name,username,password,gender,address,gmail}=req.body

        const existUser=await User.findOne({username:username})

        if(existUser){
            return res.status(400).json({success:false,err:'username'})
        }
        
        let newPassword=await argon2.hash(password)
        const newUser=new User({
            name,
            username,
            password:newPassword,
            gender,
            address,
            gmail
        })
        await newUser.save()
        res.status(200).json({success:true,err:null,id:newUser._id})
}
module.exports={
    index,
    create
}
