
const express = require('express')
const exphbs  = require('express-handlebars');
const path=require('path')
const app = express()
const passport=require('passport')
const moment =require('moment')
const logger = require('morgan')
require('dotenv').config()

const route=require('./src/routes/index')

const db=require('./src/database/connectDB') // connect database

app.use(express.static(path.join(__dirname,'/public'))) // public 

app.use(require('express-session')({ secret: process.env.COOKIE_SECURET, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'))


app.engine('hbs', exphbs({
    extname:'hbs',
    helpers:{
        upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
        increase(a,i){return a+i},
        quantityy(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
        newLine(a){if(a) return a.replace(/\n/g, "<br />");},
        discount(a,b) {return (100-a/b*100).toFixed(0)},
        nameDisplay(a){ if(!a) {return null;} let arr=a.split(' '); return arr[arr.length-1]},
        hidden(a){if(!a) {return ''} return a.charAt(0)+a.charAt(1)+'****'+a.slice(6);},
        momentFormat(a){ return moment(a).format('LL');},
        checkedBox(a,b){ if(a.includes(b)) {return 'checked' } },
        compareValue(a,b){if(a==b){return true}; return false}
    }
}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine


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


app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())

route(app)
db.connect()

app.listen(process.env.PORT||3000)

