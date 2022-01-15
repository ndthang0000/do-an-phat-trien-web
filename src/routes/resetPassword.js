const express=require('express')
const route=express.Router()


const {ResetPasswordController}=require('../controllers')

route.post('/reset-password/:token',ResetPasswordController.resetPassword)
route.get('/reset-password/:token',ResetPasswordController.formPassword)
route.post('/reset-password',ResetPasswordController.checkMail)
route.get('/',ResetPasswordController.index)

module.exports=route