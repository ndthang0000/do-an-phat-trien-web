const publicFolder=require('../public/url')
const User=require('../database/models/User')
const argon2=require('argon2')

class LoginController{
    async index(req,res){
        res.sendFile(publicFolder+'/login.html')
    }
    async validation(req,res){
        // const newPassword=await argon2.hash('ducthang123456')
        // const newUser=new User({
        //     username:'thang19120654',
        //     password:newPassword,
        //     gmail:'ndthang0000@gmail.con',
        //     name:'Vũ Văn Nguyệt',
        //     location:'Chiết Giang,Trung Quốc',
        //     avatarUrl:'/uploads/1.png'
        // })
        // newUser.save()
        console.log(req.body)
        const user={...req.body}
        console.log(user)
        try{
            const findUser=await User.findOne({username:user.username})
            if(!findUser){
                res.status(400).json({success:false,type:'username',message:'Username is not exist'})
            }
            else{
                const result=await argon2.verify(findUser.password,user.password)
                if(result){
                    res.json({success:true,message:'Login successful'})
                }
                else{
                    res.json({success:false,type:'password',message:'Your password is wrong'})
                }
            }
        }
        catch(e){
            res.render('404')
        }
    }
}
module.exports=new LoginController