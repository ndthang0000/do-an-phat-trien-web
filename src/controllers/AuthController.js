const publicFolder=require('../../public/url')



const index=(req,res)=>{
    res.sendFile(publicFolder+'/html/login.html')
}


const validation=(req,res)=>{
    console.log(req.user)
    
    if(req.user){
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
}



module.exports={
    index,
    validation,
    forgotPassword
}