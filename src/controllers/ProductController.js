const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {MongooseToObject}=require('../ultil/mongoose')
const Category=require('../database/models/Category')
const {findProductList}=require('../controllers/helper/product')



class ProductController{
    async index(req,res){  // get all product
        try{
            const result=await findProductList(req)
            const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
            const category=await Category.find({})
            res.render('products',{
                caterologyName:'All Product',
                category:MultipleMongooseToObject(category),
                products:MultipleMongooseToObject(result.resultProduct),
                relateProduct:MultipleMongooseToObject(relatedProduct),
                currentPage:result.currenPage,
                quantityPage:result.quantityPage,
                quantityProduct:result.quantity,
                key:result.key,
                min:result.min,
                max:result.max,
                type:result.type
            })
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
            const category=await Category.find({})
            if(allProduct){
                res.render('product-detail',{
                    product:MongooseToObject(allProduct),
                    relateProduct:MultipleMongooseToObject(relateProduct),
                    productJson:JSON.stringify(MongooseToObject(allProduct)),
                    category:MultipleMongooseToObject(category)
                })
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
        
        try{
            const result=await findProductList(req)
            const relatedProduct=await Product.find({}).limit(3).sort({updatedAt:-1})
            const category=await Category.find({})
            res.render('products',{
                caterologyName:req.params.category.toUpperCase(),
                category:MultipleMongooseToObject(category),
                products:MultipleMongooseToObject(result.resultProduct),
                relateProduct:MultipleMongooseToObject(relatedProduct),
                currentPage:result.currenPage,
                quantityPage:result.quantityPage,
                quantityProduct:result.quantity,
                key:result.key,
                min:result.min,
                max:result.max,
                type:result.type
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
        
    }
    async sort(req,res){
        const result=await findProductList(req)
        try{
            res.status(200).json({
                success:true,
                allProduct:result.resultProduct
            })
        }
        catch(e){
            console.log(e)
            res.status(400).json({
                success:false
            })
        }
    }

}
module.exports=new ProductController