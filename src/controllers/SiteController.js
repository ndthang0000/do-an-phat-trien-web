const caterology=require('../ultil/caterology')
class SiteController{
    index(req,res){
        res.render('home',{caterology})
    }
}
module.exports=new SiteController