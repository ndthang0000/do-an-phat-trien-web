const express=require('express')
const route=express.Router()

const {BlogController}=require('../controllers')

route.get('/',BlogController.index)
module.exports=route