const publicFolder=require('../../public/url')
const User=require('../database/models/User')
const argon2=require('argon2')

class AuthController{
    async index(req,res){
        res.sendFile(publicFolder+'/html/login.html')
    }
    async validation(req,res){
        console.log(req.user)
        
        if(req.user){
            res.redirect('/')
        }
        else{
            res.redirect('/login')
        }
    }
}
module.exports=new AuthController