const express=require('express')
const route=express.Router()


route.get('/:email',(req,res)=>{
    let {email}=req.params
    console.log(email)
    res.render('active',{
        email
    })
})


module.exports=route