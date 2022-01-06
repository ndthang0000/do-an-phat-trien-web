
const upload=require('../middlewares/multer')
const express=require('express')

const route=express.Router()

const {MeController}=require('../controllers')

route.get('/:id',MeController.index)
route.get('/:id/edit/password',MeController.editPassword)
route.post('/:id/edit/password',MeController.saveEditPassword)
route.get('/:id/edit/avatar',MeController.editAvatar)
route.post('/:id/edit/avatar',upload.single('avatar'),MeController.saveEditAvatar)
route.get('/:id/edit/info',MeController.index)
route.post('/:id/edit/info',MeController.index)
module.exports=route