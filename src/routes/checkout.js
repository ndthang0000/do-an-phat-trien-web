const express=require('express')
const route=express.Router()

const checkoutController=require('../controllers/CheckOutController')

route.get('/',checkoutController.index)
module.exports=route