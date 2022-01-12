
const upload=require('../middlewares/multer')
const express=require('express')

const route=express.Router()

const {MeController}=require('../controllers')

<<<<<<< HEAD
route.get('/edit/password',MeController.editPassword)
route.post('/edit/password',MeController.saveEditPassword)
route.get('/edit/avatar',MeController.editAvatar)
route.post('/edit/avatar',upload.single('avatar'),MeController.saveEditAvatar)
route.get('/edit/info',MeController.index)
route.post('/edit/info',MeController.index)
route.get('/',MeController.index)
=======
route.get('/:id',MeController.index)
route.get('/:id/edit/password',MeController.editPassword)
route.post('/:id/edit/password',MeController.saveEditPassword)
route.get('/:id/edit/avatar',MeController.editAvatar)
route.post('/:id/edit/avatar',upload.single('avatar'),MeController.saveEditAvatar)
route.get('/:id/edit/info',MeController.index)
route.post('/:id/edit/info',MeController.index)
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
module.exports=route