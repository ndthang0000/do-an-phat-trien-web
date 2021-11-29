const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const listCaterology=require('../ultil/caterology')




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
        try{
            const allProduct=await Product.findOne({slug:req.params.slug})
            const relateProduct=await Product.find({}).limit(3).skip(1).sort({updatedAt:-1})
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
        if(!listCaterology.includes(slug.caterology)){
            console.log('vo 404')
            res.render('404')
        }
        else{
            try{
                const allProduct=await Product.find({type:slug.caterology})
                const relatedProduct=await Product.find({}).limit(3).sort({pricePromotion:1})
                res.render('products',{products:MultipleMongooseToObject(allProduct),caterologyName:slug.caterology.toUpperCase(),caterology:listCaterology,relateProduct:MultipleMongooseToObject(relatedProduct)})
            }
            catch(e){
                res.render('404')
            }
        }
        
    }
    async filter(req,res){
        try{
            const min =parseInt(req.body.min.split('$')[1])
            const max =parseInt(req.body.max.split('$')[1])
            if(!req.body.caterogy){
                if(req.body.status==='Hot'){
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min}}).skip(5)
                }
                else if (req.body.status==='New'){
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min}}).sort({updatedAt: -1}).limit(10)
                }
                else{
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min}})
                }
            }
            else{
                if(req.body.status==='Hot'){
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min},type:req.body.caterogy})
                }
                else if (req.body.status==='New'){
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min},type:req.body.caterogy}).sort({updatedAt: -1}).limit(10)
                }
                else{
                    var allProduct=await Product.find({pricePromotion:{$lt:max,},price:{$gt:min},type:req.body.caterogy})
                }
            }

            res.json({success:true,allProduct:MultipleMongooseToObject(allProduct)})
        }
        catch(e){
            res.json({success:false})

        }
    }
}
module.exports=new ProductController