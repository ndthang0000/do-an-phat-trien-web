
const argon=require('argon2')
const Admin =require('../database/models/Admin')


class CartController{
    async index(req,res){
        const password =await argon.hash('ducthang')
        const newCart=new Admin({adminname:'admin456',password:password,name:'NguyetPham',gmail:'PhamNguyet@gmail.com'})
        await newCart.save()
        res.render('cart')
    }
    
}
module.exports=new CartController
