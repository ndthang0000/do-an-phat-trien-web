class BlogController{
    async index(req,res){
        res.render('blog')
    }
    
}
module.exports=new BlogController