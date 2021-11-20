
const express = require('express')
const exphbs  = require('express-handlebars');
const path=require('path')
const app = express()

const route=require('./src/routes/index')

const db=require('./src/database/index') // connect database

app.use(express.static(path.join(__dirname,'/src/public'))) // public 

app.engine('hbs', exphbs({
    extname:'hbs',
    helpers:{
        upperCase(e) { return e.toUpperCase()},
}}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())

route(app)
db.connect()

app.listen(process.env.PORT||5000)

module.exports=path.join(__dirname,'/src/public')