const express=require('express')
const route=express.Router()

const registerController=require('../controllers/RegisterController')

route.get('/',registerController.index)
route.post('/',registerController.create)
module.exports=route