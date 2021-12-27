const Category=require('../database/models/Category')
const Product=require('../database/models/Product')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
const homeProduct=require('./helper/product')

class SiteController{
    async index(req,res){
        try{
            const caterologyProduct=await homeProduct()
            const allProduct=await Product.find({}).limit(12).skip(2)
            const category=await Category.find({})
            res.render('home',{
                category:MultipleMongooseToObject(category),
                caterologyProducts:caterologyProduct,
                allProduct:MultipleMongooseToObject(allProduct)
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new SiteController