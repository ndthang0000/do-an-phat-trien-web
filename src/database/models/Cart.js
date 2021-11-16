const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Cart=new Schema({
    user:{type:Schema.Types.ObjectId,required:true},
    products:[{product:{type:Schema.Types.ObjectId,required:true},quantity:{type:String},color:{type:String},size:{type:String},_id:false}],
})
module.exports=mongoose.model('Cart',Cart)