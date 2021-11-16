const productRouter=require('./product')
const siteRouter=require('./site')
const checkoutRouter=require('./checkout')
const ContactRouter=require('./contact')
const BlogRouter=require('./blog')
const cartRouter=require('./cart')
const loginRouter=require('./login')
function route(app){
    app.use('/cart',cartRouter)
    app.use('/product',productRouter)
    app.use('/check-out',checkoutRouter)
    app.use('/contact',ContactRouter)
    app.use('/blog',BlogRouter)
    app.use('/login',loginRouter)
    app.use('/',siteRouter)

}
module.exports=route