const {Category}=require('../database')
const {MultipleMongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    const category=await Category.find({})
    res.render('contact',{
        category:MultipleMongooseToObject(category)
    })
}
    

module.exports={
    index
}