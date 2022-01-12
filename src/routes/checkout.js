const express=require('express')
const route=express.Router()

const {CheckOutController}=require('../controllers/')

route.post('/new-order',CheckOutController.newOrder)
route.get('/',CheckOutController.index)
module.exports=route