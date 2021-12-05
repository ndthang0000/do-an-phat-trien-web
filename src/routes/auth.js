const express=require('express')
const route=express.Router()

const authController=require('../controllers/AuthController')
const passport = require('../controllers/helper/auth')

route.get('/',authController.index)
route.post('/',passport.authenticate('local',{ successRedirect: '/',failureRedirect: '/login?wrong'}))
                                                
module.exports=route