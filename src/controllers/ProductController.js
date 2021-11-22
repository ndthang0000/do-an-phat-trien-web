const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')

class ProductController{
    async index(req,res){  // get all product
        try{
            const allProduct=await Product.find({})
            const formatAllProduct=MultipleMongooseToObject(allProduct)
            formatAllProduct.forEach(product=>{
                product.quantity=product.info.reduce((total,item)=>{
                    return total+item.quantity
                },0)
                product.discount=parseInt(100-(product.pricePromotion/product.price)*100)
            })
            console.log(formatAllProduct)
            res.render('products',{caterology:listCaterology,caterologyName:'All Product',products:formatAllProduct})
        
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
            formatAllProduct.quantity=formatAllProduct.info.reduce((total,item)=>{
                return total+item.quantity
            },0)
            formatAllProduct.discount=parseInt(100-(formatAllProduct.pricePromotion/formatAllProduct.price)*100)
            const relateProduct=await Product.find({}).limit(1).skip(5)
            const formatRelateProduct=MultipleMongooseToObject(relateProduct)
            formatRelateProduct.forEach(product=>{
                product.quantity=product.info.reduce((total,item)=>{
                    return total+item.quantity
                },0)
                product.discount=parseInt(100-(product.pricePromotion/product.price)*100)
            })
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
                    product.quantity=product.info.reduce((total,item)=>{
                        return total+item.quantity
                    },0)
                    product.discount=parseInt(100-(product.pricePromotion/product.price)*100)
                })
                res.render('products',{products:formatAllProduct,caterology:slug.caterology.toUpperCase(),caterology:listCaterology})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
}
module.exports=new ProductController