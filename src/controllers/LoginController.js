const publicFolder=require('../public/url')

class LoginController{
    async index(req,res){
        res.sendFile(publicFolder+'/login.html')
    }
}
module.exports=new LoginController