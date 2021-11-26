const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')
const formatProduct=require('./helper/formatProduct')



class ProductController{
    async index(req,res){  // get all product
        try{
            const allProduct=await Product.find({})
            const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
            res.render('products',{caterology:listCaterology,caterologyName:'All Product',products:MultipleMongooseToObject(allProduct),relateProduct:MultipleMongooseToObject(relatedProduct)})
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
    async detail(req,res){   // get detail product 
        console.log(req.params.slug)
        try{
            const allProduct=await Product.findOne({slug:req.params.slug})
            const relateProduct=await Product.find({}).limit(3).skip(1).sort({updatedAt:-1})
            console.log(allProduct)
            if(allProduct){
                res.render('product-detail',{product:MongooseToObject(allProduct),relateProduct:MultipleMongooseToObject(relateProduct)})
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
                const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
                res.render('products',{products:MultipleMongooseToObject(allProduct),caterologyName:slug.caterology.toUpperCase(),caterology:listCaterology,relateProduct:MultipleMongooseToObject(relatedProduct)})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
}
module.exports=new ProductController