const meMiddleWare=(req,res,next)=>{
    if(!req.user){
        res.redirect('/login')
        return
    }
    next()
}
<<<<<<< HEAD
const preventLoginMiddleWare=(req,res,next)=>{
=======
const prventLoginMiddleWare=(req,res,next)=>{
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
    if(req.user){
        res.redirect('/')
        return
    }
    next()
}

<<<<<<< HEAD
module.exports={meMiddleWare,preventLoginMiddleWare}
=======
module.exports={meMiddleWare,prventLoginMiddleWare}
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
