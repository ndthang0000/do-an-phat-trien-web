const argon2=require('argon2')
const publicFolder=require('../../public/url')
const {User,ResetPassword}=require('../database')
const { v4: uuidv4 } = require('uuid');
const {sendMail}=require('../ultil');
const { MongooseToObject } = require('../ultil/mongoose');

const index=async(req,res)=>{
    res.sendFile(publicFolder+'/html/forgotPass.html')
}
const checkMail=async(req,res)=>{
    const {gmail}=req.body
    let now=new Date()
    let existEmail=await User.findOne({gmail:gmail})
    if(!existEmail){
        return res.status(400).json({success:false,err:'email'})
    }
    const newToken=new ResetPassword({
        userId:existEmail._id,
        token:uuidv4(),
        timeOut:new Date(now.getFullYear(),now.getMonth(),now.getDate()+1)
    })
    newToken.save()
    res.status(200).json({success:true,err:null,gmail:gmail})
    existEmail=existEmail.toObject()
    if(req.hostname==='localhost' || req.hostname==='127.0.0.1') {
        existEmail.link='http://localhost:3000/forgot-password/reset-password/'+newToken.token
    }
    else{
        existEmail.link='https://the-1-beauty-fashion.herokuapp.com/forgot-password/reset-password/'+newToken.token
    }
    await sendMail.sendMailResetPassword(existEmail)
}

const formPassword=async(req,res)=>{
    let {token}=req.params
    let findToken=await ResetPassword.findOne({token:token})
    if(findToken){
        let user=await User.findOne({_id:findToken.userId})
        res.render('formResetPassword',{
            username:user.username,
            name:user.name,
            success:false,
        })
    }
    else{
        res.render('404')
    }
}
const resetPassword=async(req,res)=>{
    let {token}=req.params
    let findToken=await ResetPassword.findOne({token:token})
    let now=new Date()
    console.log(findToken)
    if(now-findToken.timeOut){
        console.log(' now lớn')
    }
    else{
        console.log('now nhỏ')
    }
    if(findToken){
        let password=await argon2.hash(req.body.newPassword)
        await User.updateOne({_id:findToken.userId},{password:password})
        let findUser=await User.findOne({_id:findToken.userId})
        res.render('formResetPassword',{
            username:findUser.username,
            name:findUser.name,
            success:true,
            message:'Change password successfully !!'
        })
        await ResetPassword.deleteOne({token:token})
    }
    else{
        res.render('404')
    }
}

module.exports={
    index,
    checkMail,
    formPassword,
    resetPassword
}
