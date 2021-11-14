class CartController{
    async index(req,res){
        res.render('cart')
    }
    
}
module.exports=new CartController
