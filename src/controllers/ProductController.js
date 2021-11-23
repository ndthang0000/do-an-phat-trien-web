const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')
const formatProduct=require('./helper/formatProduct')



class ProductController{
    async index(req,res){  // get all product
        try{
            const allProduct=await Product.find({})
            const formatAllProduct=MultipleMongooseToObject(allProduct)
            formatAllProduct.forEach(product=>{
                formatProduct(product)
            })
            const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
            const formatRelateProduct=MultipleMongooseToObject(relatedProduct)
            formatRelateProduct.forEach(product=>{
                formatProduct(product)
            })
            res.render('products',{caterology:listCaterology,caterologyName:'All Product',products:formatAllProduct,relateProduct:formatRelateProduct})
        
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
    async detail(req,res){   // get detail product 
        const slug=req.params
        console.log(slug)
        try{
            var allProduct=await Product.findOne({slug:slug.slug})
            const formatAllProduct=MongooseToObject(allProduct)
            formatProduct(formatAllProduct)
            const relateProduct=await Product.find({}).limit(3).skip(1).sort({updatedAt:-1})
            const formatRelateProduct=MultipleMongooseToObject(relateProduct)
            formatRelateProduct.forEach(product=>{
                formatProduct(product)
            })
            console.log(formatRelateProduct)
            if(formatAllProduct){
                res.render('product-detail',{product:formatAllProduct,relateProduct:formatRelateProduct})
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
                const formatAllProduct=MultipleMongooseToObject(allProduct)
                formatAllProduct.forEach(product=>{
                    formatProduct(product)
                })
                const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
                const formatRelateProduct=MultipleMongooseToObject(relatedProduct)
                formatRelateProduct.forEach(product=>{
                    formatProduct(product)
                })
                res.render('products',{products:formatAllProduct,caterologyName:slug.caterology.toUpperCase(),caterology:listCaterology,relateProduct:formatRelateProduct})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
}
module.exports=new ProductController