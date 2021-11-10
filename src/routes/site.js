const express=require('express')
const route=express.Router()

const siteController=require('../conttrollers/SiteController')

route.get('/',siteController.index)
module.exports=route