const caterology=require('../ultil/caterology')
const Product=require('../database/models/Product')
const {MongooseToObject,MultipleMongooseToObject}=require('../ultil/mongoose')
const formatProduct=require('./helper/formatProduct')
class SiteController{
    async index(req,res){
        try{
            var caterologyProduct=[]
            const tee=await Product.findOne({type:'tee'})
            tee.caterology='tee'
            const hoodie=await Product.findOne({type:'hoodie'})
            hoodie.caterology='hoodie'
            const accessory=await Product.findOne({type:'accessory'})
            accessory.caterology='accessory'
            const pant=await Product.findOne({type:'pant'})
            pant.caterology='pant'
            const bag=await Product.findOne({type:'bag'})
            bag.caterology='bag'
            caterologyProduct.push(tee)
            caterologyProduct.push(hoodie)
            caterologyProduct.push(accessory)
            caterologyProduct.push(pant)
            caterologyProduct.push(bag)
            console.log(caterologyProduct)
            res.render('home',{caterology,caterologyProducts:MultipleMongooseToObject(caterologyProduct)})
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new SiteController