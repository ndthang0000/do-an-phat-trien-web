const ProductRouter=require('./product')
const SiteRouter=require('./site')
const CheckoutRouter=require('./checkout')
const ContactRouter=require('./contact')
const BlogRouter=require('./blog')
const CartRouter=require('./cart')
const AuthRouter=require('./auth')
const MeRouter=require('./me')
const Register=require('./register')
const Active=require('./active')
const {meMiddleWare,preventLoginMiddleWare}=require('../middlewares/customMiddleWare')

function route(app){
    app.use('/me',meMiddleWare,MeRouter)
    app.use('/cart',CartRouter)
    app.use('/product',ProductRouter)
    app.use('/check-out',CheckoutRouter)
    app.use('/contact',ContactRouter)
    app.use('/blog',BlogRouter)
    app.use('/login',preventLoginMiddleWare,AuthRouter)
    app.use('/register',Register)
    app.use('/active',Active)
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
    app.use('/',SiteRouter)
}
module.exports=route