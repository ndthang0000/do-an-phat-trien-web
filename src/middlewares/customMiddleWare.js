const meMiddleWare=(req,res,next)=>{
    if(!req.user){
        res.redirect('/login')
        return
    }
    next()
}
const prventLoginMiddleWare=(req,res,next)=>{
    if(req.user){
        res.redirect('/')
        return
    }
    next()
}

module.exports={meMiddleWare,prventLoginMiddleWare}