const meMiddleWare=(req,res,next)=>{
    if(!req.user){
        res.redirect('/login')
        return
    }
    next()
}
const preventLoginMiddleWare=(req,res,next)=>{
    if(req.user){
        res.redirect('/')
        return
    }
    next()
}

module.exports={meMiddleWare,preventLoginMiddleWare}