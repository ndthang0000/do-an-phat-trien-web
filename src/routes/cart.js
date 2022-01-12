const express=require('express')
const route=express.Router()

const {CartController}=require('../controllers')

<<<<<<< HEAD
route.get('/length',CartController.getLength)
route.post('/update',CartController.update)
route.post('/add',CartController.add)
route.post('/get-product',CartController.getProduct)
route.get('/',CartController.index)

=======
route.get('/',CartController.index)
route.post('/add',CartController.add)
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
module.exports=route