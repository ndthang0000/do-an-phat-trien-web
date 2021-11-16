const express=require('express')
const route=express.Router()

const loginController=require('../controllers/LoginController')

route.get('/',loginController.index)
module.exports=route