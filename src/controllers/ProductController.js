const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')

class ProductController{
    async index(req,res){  // get all product
        try{
            const allProduct=await Product.find({})
            allProduct.forEach(product=>{
                product.quantity=product.info.reduce((total,item)=>{
                    return total+item.quantity
                },0)
                product.discount=parseInt(100-(product.pricePromotion/product.price)*100)
            })
            
            res.render('products',{caterology:listCaterology,caterologyName:'All Product',products:MultipleMongooseToObject(allProduct)})
        
        }
        catch(e){
            res.render('404')
        }
    }
    async detail(req,res){   // get detail product 
        const slug=req.params
        console.log(slug)
        try{
            var allProduct=await Product.findOne({slug:slug.slug})
            allProduct.quantity=allProduct.info.reduce((total,item)=>{
                return total + item.quantity
            },0)
            allProduct.discount=parseInt(100-(allProduct.pricePromotion/allProduct.price)*100)
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
                res.render('products',{products:MultipleMongooseToObject(allProduct),caterology:slug.caterology.toUpperCase(),caterology:listCaterology})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
}
module.exports=new ProductController