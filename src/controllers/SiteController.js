const caterology=require('../ultil/caterology')
const Product=require('../database/models/Product')
const {MongooseToObject,MultipleMongooseToObject}=require('../ultil/mongoose')
const formatProduct=require('./helper/formatProduct')
class SiteController{
    async index(req,res){
        try{
            var caterologyProduct=[]
            var tee=await Product.findOne({type:'tee'})
            tee=MongooseToObject(tee)
            tee.caterology='tee'
            var hoodie=await Product.findOne({type:'hoodie'})
            hoodie=MongooseToObject(hoodie)
            hoodie.caterology='hoodie'
            var accessory=await Product.findOne({type:'accessory'})
            accessory=MongooseToObject(accessory)
            accessory.caterology='accessory'
            var pant=await Product.findOne({type:'pant'})
            pant=MongooseToObject(pant)
            pant.caterology='pant'
            var bag=await Product.findOne({type:'bag'})
            bag=MongooseToObject(bag)
            bag.caterology='bag'
            caterologyProduct.push(tee)
            caterologyProduct.push(hoodie)
            caterologyProduct.push(accessory)
            caterologyProduct.push(pant)
            caterologyProduct.push(bag)
            console.log(caterologyProduct)
            res.render('home',{caterology,caterologyProducts:caterologyProduct})
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new SiteController