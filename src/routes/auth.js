const express=require('express')
const route=express.Router()

const {AuthController}=require('../controllers')
const passport = require('../middlewares/passport')

route.get('/',AuthController.index)
route.post('/',passport.authenticate('local',{ successRedirect: '/',failureRedirect: '/login?wrong'}))

module.exports=route