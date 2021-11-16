const express=require('express')
const route=express.Router()

const productController=require('../controllers/ProductController')

route.get('/detail/:slug',productController.detail)
route.get('/:caterology',productController.caterology)
route.get('/',productController.index)
module.exports=route