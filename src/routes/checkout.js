const express=require('express')
const route=express.Router()

const {CheckOutController}=require('../controllers/')

<<<<<<< HEAD
route.post('/new-order',CheckOutController.newOrder)
=======
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
route.get('/',CheckOutController.index)
module.exports=route