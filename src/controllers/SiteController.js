
const {Category,Product}=require('../database')
const {MultipleMongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    try{
        const allProduct=await Product.find({}).limit(12).skip(2)
        const category=await Category.find({})
        const lastestProduct1=await Product.find({}).sort({createdAt:-1}).limit(3)
        const lastestProduct2=await Product.find({}).sort({createdAt:-1}).limit(3).skip(3)
        const saleProduct1=await Product.find({}).sort({quantitySold:-1}).limit(3)
        const saleProduct2=await Product.find({}).sort({quantitySold:-1}).limit(3).skip(3)
        
        res.render('home',{
            category:MultipleMongooseToObject(category),
            allProduct:MultipleMongooseToObject(allProduct),
            lastestProduct1:MultipleMongooseToObject(lastestProduct1),
            saleProduct1:MultipleMongooseToObject(saleProduct1),
            lastestProduct2:MultipleMongooseToObject(lastestProduct2),
            saleProduct2:MultipleMongooseToObject(saleProduct2),
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}
module.exports={
    index
}