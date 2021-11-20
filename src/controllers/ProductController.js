const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')

class ProductController{
    async index(req,res){
        try{
            const allProduct=await Product.find({})
            res.render('products',{products:MultipleMongooseToObject(allProduct),caterology:'All Product'})
        }
        catch(e){
            res.render('404')
        }
    }
    async detail(req,res){
        const slug=req.params
        console.log(slug)
        try{
            const allProduct=await Product.findOne({slug:slug.slug})
            if(allProduct){
                res.render('product-detail',{product:MongooseToObject(allProduct)})
            }
            else{
                res.render('404')
            }
        }
        catch(e){
            res.render('404')
        }
    }
    async caterology(req,res){
        const slug=req.params
        console.log(slug)
        if(!listCaterology.includes(slug.caterology)){
            console.log('vo 404')
            res.render('404')
        }
        else{
            try{
                const allProduct=await Product.find({type:slug.caterology})
                console.log(allProduct)
                res.render('products',{products:MultipleMongooseToObject(allProduct),caterology:slug.caterology.toUpperCase()})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
}
module.exports=new ProductController