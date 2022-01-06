const express=require('express')
const route=express.Router()

const {ContactController}=require('../controllers')

route.get('/',ContactController.index)
module.exports=route