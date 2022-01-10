const express=require('express')
const route=express.Router()

const {CartController}=require('../controllers')

route.get('/length',CartController.getLength)
route.post('/update',CartController.update)
route.post('/add',CartController.add)
route.post('/get-product',CartController.getProduct)
route.get('/',CartController.index)

module.exports=route