const express=require('express')
const route=express.Router()

const productController=require('../conttrollers/ProductController')

route.get('/:slug',productController.detail)
route.get('/',productController.index)
module.exports=route