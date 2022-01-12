
const express = require('express')
const exphbs  = require('express-handlebars');
const path=require('path')
const app = express()
const passport=require('passport')
const cors=require('cors')

const logger = require('morgan')
require('dotenv').config()

const route=require('./src/routes/index')
const {helperHandleBar}=require('./src/ultil')
const db=require('./src/database/connectDB') // connect database

app.use(express.static(path.join(__dirname,'/public'))) // public 

app.use(logger('dev'))

app.use(cors()) // cors

app.engine('hbs', exphbs({
    extname:'hbs',
    helpers:helperHandleBar
}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine




app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())


db.connect().then(()=>{
    app.use(require('express-session')({ secret: process.env.COOKIE_SECURET, resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req,res,next)=>{
        if(req.isAuthenticated()){
            res.locals.user=req.user
        }
        else{
            res.locals.user={
                _id:false
            }
        }
        next()
    })
    route(app)
})

app.listen(process.env.PORT||3000)

