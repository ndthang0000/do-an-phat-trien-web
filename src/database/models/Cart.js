const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Cart=new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    product:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
    infor:[{quantity:{type:Number,default:0},size:String}]
})
module.exports=mongoose.model('Cart',Cart)