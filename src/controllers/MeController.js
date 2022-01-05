const User=require('../database/models/User')
const Category=require('../database/models/Category')
const {MongooseToObject, MultipleMongooseToObject}=require('../ultil/mongoose')
const argon2=require('argon2')

class MeController{
    async index(req,res){
        const category=await Category.find({})
        res.render('profile',{
            category:MultipleMongooseToObject(category)
        })
    }
    async editPassword(req,res){
        res.render('profile-edit-password')
    }
    async saveEditPassword(req,res){
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
    async editAvatar(req,res){
        res.render('edit-avatar')
    }
    async saveEditAvatar(req,res){
        const user=await User.findById(req.params.id)
        if(user){
            user.avatarUrl='/uploads/'+req.file.filename
        }
        await user.save()
        res.render('profile',{user:MongooseToObject(user)})
    }
}
module.exports=new MeController