
const {User,Category}=require('../database')
const {MongooseToObject, MultipleMongooseToObject}=require('../ultil/mongoose')
const argon2=require('argon2')


const index=async(req,res)=>{
    const category=await Category.find({})
    res.render('profile',{
        category:MultipleMongooseToObject(category)
    })
}
const editPassword=async(req,res)=>{
    res.render('profile-edit-password')
}
const saveEditPassword=async(req,res)=>{
    const {currentPassword,newPassword}=req.body
    
    try{
        let isValidPassword=await argon2.verify(req.user.password,currentPassword)
        if(isValidPassword){
            const user=await User.findById(req.user._id)

            user.password=await argon2.hash(newPassword)
            
            await user.save()
            return res.render('profile',{message:'Change password successfully'})
        }
        else{
            res.render('profile-edit-password',{message:'Current password is wrong !! '})
        }
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}
const editAvatar=async(req,res)=>{
    res.render('edit-avatar')
}
const saveEditAvatar=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        user.avatarUrl='/uploads/'+req.file.filename
    }
    await user.save()
    res.render('profile',{user:MongooseToObject(user)})
}
module.exports={
    index,
    editPassword,
    saveEditPassword,
    editAvatar,
    saveEditAvatar
}