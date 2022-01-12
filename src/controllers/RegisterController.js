const argon2=require('argon2')
const publicFolder=require('../../public/url')
const {User,ActiveRegister}=require('../database')
const { v4: uuidv4 } = require('uuid');
const {sendMailRegister}=require('../ultil/mail')

const index=async(req,res)=>{
    res.sendFile(publicFolder+'/html/register.html')
}
const create=async(req,res)=>{
    console.log(' vo day đi ')
    const {name,username,password,gender,address,gmail}=req.body

    const existUser=await User.findOne({username:username})

    if(existUser){
        return res.status(400).json({success:false,err:'username'})
    }
    
    let newPassword=await argon2.hash(password)
    let newUser=new User({
        name,
        username,
        password:newPassword,
        gender,
        address,
        gmail
    })
    await newUser.save()
    newUser=newUser.toObject()
    var date = new Date();
    let newActive=new ActiveRegister({
        userId:newUser._id,
        token:uuidv4(),
        timeOut:date.setDate(date.getDate() + 1),
    })
    await newActive.save()
    console.log(req.hostname)
    newUser.link=req.host+'/register/active/'+newActive.token
    await sendMailRegister(newUser)
    res.status(200).json({success:true,err:null,id:newUser._id})
}
const active=async(req,res)=>{
    let {token}=req.params
    let findToken=await ActiveRegister.findOne({token:token})
    if(findToken){
        await User.updateOne({_id:findToken.userId},{isAuth:true})
    }
    else{
        res.render('404')
    }
    await ActiveRegister.deleteOne({_id:findToken._id})
    res.render('active-success')
}

module.exports={
    index,
    create,
    active
}
