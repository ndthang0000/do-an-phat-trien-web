const express=require('express')
const route=express.Router()

const {RegisterController}=require('../controllers')

route.get('/',RegisterController.index)
route.post('/',RegisterController.create)
module.exports=route