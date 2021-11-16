
const argon=require('argon2')
const Admin =require('../database/models/Admin')


class CartController{
    async index(req,res){
        
        res.render('cart')
    }
    
}
module.exports=new CartController
