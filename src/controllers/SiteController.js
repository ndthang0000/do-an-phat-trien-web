const caterology=require('../ultil/caterology')
const Product=require('../database/models/Product')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const homeProduct=require('./helper/product')

class SiteController{
    async index(req,res){
        try{
            const caterologyProduct=await homeProduct()
            const allProduct=await Product.find({}).limit(12).skip(2)
            res.render('home',{caterology,caterologyProducts:caterologyProduct,allProduct:MultipleMongooseToObject(allProduct)})
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new SiteController