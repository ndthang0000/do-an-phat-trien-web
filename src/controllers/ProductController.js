
class ProductController{
    async index(req,res){
        res.render('products')
    }
    detail(req,res){
        console.log(req.params)
        res.render('product-detail')
    }
    caterology(req,res){
        res.render('products')
    }
}
module.exports=new ProductController