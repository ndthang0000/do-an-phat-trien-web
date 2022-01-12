
const {Category,Product}=require('../database')
<<<<<<< HEAD
const {MultipleMongooseToObject}=require('../ultil/mongoose')
=======
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17

const index=async(req,res)=>{
    try{
        const allProduct=await Product.find({}).limit(12).skip(2)
        const category=await Category.find({})
        res.render('home',{
            category:MultipleMongooseToObject(category),
            allProduct:MultipleMongooseToObject(allProduct)
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