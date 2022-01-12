const ProductRouter=require('./product')
const SiteRouter=require('./site')
const CheckoutRouter=require('./checkout')
const ContactRouter=require('./contact')
const BlogRouter=require('./blog')
const CartRouter=require('./cart')
const AuthRouter=require('./auth')
const MeRouter=require('./me')
const Register=require('./register')

<<<<<<< HEAD
const {meMiddleWare,preventLoginMiddleWare}=require('../middlewares/customMiddleWare')
=======
const {meMiddleWare,prventLoginMiddleWare}=require('../middlewares/customMiddleWare')
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17

function route(app){
    app.use('/me',meMiddleWare,MeRouter)
    app.use('/cart',CartRouter)
    app.use('/product',ProductRouter)
    app.use('/check-out',CheckoutRouter)
    app.use('/contact',ContactRouter)
    app.use('/blog',BlogRouter)
<<<<<<< HEAD
    app.use('/login',preventLoginMiddleWare,AuthRouter)
    app.use('/register',preventLoginMiddleWare,Register)
=======
    app.use('/login',prventLoginMiddleWare,AuthRouter)
    app.use('/register',prventLoginMiddleWare,Register)
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
    app.use('/',SiteRouter)
}
module.exports=route