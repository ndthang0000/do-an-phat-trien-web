const Product=require('../../database/models/Product')
const {MongooseToObject}=require('../../ultil/mongoose')


const homeProduct=async ()=>{
    var caterologyProduct=[]
    var tee=await Product.findOne({type:'tee'})
    tee=MongooseToObject(tee)
    tee.caterology='tee'
    var hoodie=await Product.findOne({type:'hoodie'})
    hoodie=MongooseToObject(hoodie)
    hoodie.caterology='hoodie'
    var accessory=await Product.findOne({type:'accessory'}).skip(2)
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
    return caterologyProduct
}

module.exports=homeProduct

