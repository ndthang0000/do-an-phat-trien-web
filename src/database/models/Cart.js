const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Cart=new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    product:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
<<<<<<< HEAD
    infor:[{quantity:{type:Number,default:0},size:String,_id:false}]
=======
    infor:[{quantity:{type:Number,default:0},size:String}]
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
})
module.exports=mongoose.model('Cart',Cart)