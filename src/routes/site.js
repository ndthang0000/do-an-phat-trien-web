const express=require('express')
const route=express.Router()

const {SiteController}=require('../controllers')

route.get('/',SiteController.index)
module.exports=route