const express=require('express')
const route=express.Router()

const meController=require('../controllers/MeController')

route.get('/:id',meController.index)
route.get('/:id/edit/password',meController.editPassword)
route.post('/:id/edit/password',meController.saveEditPassword)
route.get('/:id/edit/info',meController.index)
route.post('/:id/edit/info',meController.index)
module.exports=route