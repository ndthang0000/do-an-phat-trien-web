const express=require('express')
const route=express.Router()


const {ResetPasswordController}=require('../controllers')

route.get('/',ResetPasswordController.index)
route.post('/reset-password',ResetPasswordController.checkMail)

module.exports=route