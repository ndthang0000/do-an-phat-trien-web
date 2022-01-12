const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    paymentType:{type:String,default:'COD'},
    paymentInfor:{type:String},
    shippingFee:{type:Number,default:2},
    status:{type:Number,default:-1},
    code:{type:String},
    quantity:{type:Number,default:0},
    sum:{type:Number,required:true},
    tel:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String},
    name:{type:String}
},{timestamps:true});
module.exports=mongoose.model('Order',Order)