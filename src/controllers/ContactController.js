class ContactController{
    async index(req,res){
        res.render('contact')
    }
    
}
module.exports=new ContactController