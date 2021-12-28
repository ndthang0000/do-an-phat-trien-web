const express=require('express')
const route=express.Router()

const productController=require('../controllers/ProductController')

route.get('/detail/:slug',productController.detail)
route.get('/:category',productController.caterology)
route.post('/:category',productController.sort)
route.get('/',productController.index)
route.post('/',productController.sort)
module.exports=route