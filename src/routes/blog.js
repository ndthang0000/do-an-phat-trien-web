const express=require('express')
const route=express.Router()

const BlogController=require('../controllers/BlogController')

route.get('/',BlogController.index)
module.exports=route