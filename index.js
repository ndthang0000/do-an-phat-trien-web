
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
        upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
        increase(a,i){return a+i},
        quantity(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
        newLine(a){if(a) return a.replace(/\n/g, "<br />");},
        discount(a,b) {return (100-a/b*100).toFixed(0)}
    }
}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())

route(app)
db.connect()

app.listen(process.env.PORT||3000)

module.exports=path.join(__dirname,'/src/public')