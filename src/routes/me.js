
const upload=require('../middlewares/multer')
const express=require('express')

const route=express.Router()

const {MeController}=require('../controllers')

route.get('/edit/password',MeController.editPassword)
route.post('/edit/password',MeController.saveEditPassword)
route.get('/edit/avatar',MeController.editAvatar)
route.post('/edit/avatar',upload.single('avatar'),MeController.saveEditAvatar)
route.get('/edit/info',MeController.index)
route.post('/edit/info',MeController.index)
route.get('/',MeController.index)
module.exports=route