const express=require('express')
const route=express.Router()

const {ProductController}=require('../controllers')

route.get('/detail/:slug',ProductController.detail)
route.get('/:category',ProductController.caterology)
route.post('/:category',ProductController.sort)
route.get('/',ProductController.index)
route.post('/',ProductController.sort)
module.exports=route