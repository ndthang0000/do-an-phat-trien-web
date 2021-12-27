const express=require('express')
const route=express.Router()

const productController=require('../controllers/ProductController')

route.get('/detail/:slug',productController.detail)
route.get('/:category',productController.caterology)
route.get('/',productController.index)
route.post('/',productController.filter)
module.exports=route