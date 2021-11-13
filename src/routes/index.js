const productRouter=require('./product')
const siteRouter=require('./site')
const checkoutRouter=require('./checkout')
function route(app){
    app.use('/product',productRouter)
    app.use('/check-out',checkoutRouter)
    app.use('/',siteRouter)
}
module.exports=route