const Cart=require('./models/Cart')
const Category=require('./models/Category')
const Order=require('./models/Order')
const User=require('./models/User')
const Product=require('./models/Product')
const OrderDetail=require('./models/Order_Detail')
const ActiveRegister=require('./models/Active_Register')
const Comment=require('./models/Comment')
const ResetPassword=require('./models/Reset_Password')

module.exports={
    Cart,
    Category,
    Order,
    User,
    Product,
    OrderDetail,
    ActiveRegister,
    Comment,
    ResetPassword
}