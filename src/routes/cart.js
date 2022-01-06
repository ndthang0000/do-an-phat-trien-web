const express=require('express')
const route=express.Router()

const {CartController}=require('../controllers')

route.get('/',CartController.index)
route.post('/add',CartController.add)
module.exports=route