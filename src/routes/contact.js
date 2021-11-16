const express=require('express')
const route=express.Router()

const ContactController=require('../controllers/ContactController')

route.get('/',ContactController.index)
module.exports=route