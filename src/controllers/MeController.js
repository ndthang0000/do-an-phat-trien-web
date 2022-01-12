
const {User,Category}=require('../database')
const {MongooseToObject, MultipleMongooseToObject}=require('../ultil/mongoose')
const argon2=require('argon2')
<<<<<<< HEAD
=======


>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
const index=async(req,res)=>{
    const category=await Category.find({})
    res.render('profile',{
        category:MultipleMongooseToObject(category)
    })
}
const editPassword=async(req,res)=>{
<<<<<<< HEAD
    const category=await Category.find({})
    res.render('profile-edit-password',{
        category:MultipleMongooseToObject(category)
    })
=======
    res.render('profile-edit-password')
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
}
const saveEditPassword=async(req,res)=>{
    const {currentPassword,newPassword}=req.body
    
    try{
<<<<<<< HEAD
        const category=await Category.find({})
=======
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
        let isValidPassword=await argon2.verify(req.user.password,currentPassword)
        if(isValidPassword){
            const user=await User.findById(req.user._id)

            user.password=await argon2.hash(newPassword)
            
            await user.save()
<<<<<<< HEAD
            return res.render('profile',{
                message:'Change password successfully',
                category:MultipleMongooseToObject(category)
            })
=======
            return res.render('profile',{message:'Change password successfully'})
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
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
<<<<<<< HEAD
    const category=await Category.find({})
    res.render('edit-avatar',{
        category:MultipleMongooseToObject(category)
    })
}
const saveEditAvatar=async(req,res)=>{
    const category=await Category.find({})
    const user=await User.findById(req.user._id)
=======
    res.render('edit-avatar')
}
const saveEditAvatar=async(req,res)=>{
    const user=await User.findById(req.params.id)
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
    if(user){
        user.avatarUrl='/uploads/'+req.file.filename
    }
    await user.save()
<<<<<<< HEAD
    res.render('profile',{
        user:MongooseToObject(user),
        category:MultipleMongooseToObject(category)
    })
=======
    res.render('profile',{user:MongooseToObject(user)})
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
}
module.exports={
    index,
    editPassword,
    saveEditPassword,
    editAvatar,
    saveEditAvatar
}