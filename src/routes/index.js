const ProductRouter=require('./product')
const SiteRouter=require('./site')
const CheckoutRouter=require('./checkout')
const ContactRouter=require('./contact')
const BlogRouter=require('./blog')
const CartRouter=require('./cart')
const AuthRouter=require('./auth')
const MeRouter=require('./me')
const Register=require('./register')

const {meMiddleWare}=require('../middlewares/meMiddleware')

function route(app){
    app.use('/me',meMiddleWare,MeRouter)
    app.use('/cart',CartRouter)
    app.use('/product',ProductRouter)
    app.use('/check-out',CheckoutRouter)
    app.use('/contact',ContactRouter)
    app.use('/blog',BlogRouter)
    app.use('/login',AuthRouter)
    app.use('/register',Register)
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
    app.use('/',SiteRouter)
}
module.exports=route