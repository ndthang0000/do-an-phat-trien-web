const express=require('express')
const route=express.Router()

const {CheckOutController}=require('../controllers/')

route.get('/',CheckOutController.index)
module.exports=route