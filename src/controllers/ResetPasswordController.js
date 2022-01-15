const argon2=require('argon2')
const publicFolder=require('../../public/url')
const {User,ResetPassword}=require('../database')
const { v4: uuidv4 } = require('uuid');
const {sendMail}=require('../ultil')

const index=async(req,res)=>{
    res.sendFile(publicFolder+'/html/forgotPass.html')
}
const checkMail=async(req,res)=>{
    console.log(' vo day đi ')
    const {gmail}=req.body
    const existEmail=await User.findOne({gmail:gmail})
    if(!existEmail){
        return res.status(400).json({success:false,err:'email'})
    }

    res.status(200).json({success:true,err:null,gmail:gmail})
    user=user.toObject()
    if(req.hostname==='localhost' || req.hostname==='127.0.0.1') {
        newUser.link='http://localhost:3000/reset-password/'+newActive.token
    }
    else{
        newUser.link='https://the-1-beauty-fashion.herokuapp.com/reset-password/'+newActive.token
    }
    await sendMail.sendMailResetPassword(gmail)
}
// const active=async(req,res)=>{
//     let {token}=req.params
//     let findToken=await ActiveRegister.findOne({token:token})
//     if(findToken){
//         await User.updateOne({_id:findToken.userId},{isAuth:true})
//     }
//     else{
//         res.render('404')
//     }
//     await ActiveRegister.deleteOne({_id:findToken._id})
//     res.render('active-success')
// }

module.exports={
    index,
    checkMail
}
