const express=require('express')
const route=express.Router()

const siteController=require('../controllers/SiteController')

route.get('/',siteController.index)
module.exports=route