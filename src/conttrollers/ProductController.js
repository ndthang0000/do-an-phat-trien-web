const blogPost=require('../database/models/BlogPost')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
class ProductController{
    index(req,res){
        const bp=new blogPost({
            title: "thang nguyen duc",
            body: "body",
            date: "2016-08-05"})
        bp.save()
        blogPost.find({},(err,data)=>{
            if(!err){
                res.render('home',{courses:MultipleMongooseToObject(data)})
            }else{
                res.json({error:'error'})
            }
        })
        //res.render('home')

    }
}
module.exports=new ProductController