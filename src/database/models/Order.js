const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
    products:[{product:{type:Schema.Types.ObjectId,ref:'Product'},color:String,size:String,quantity:Number,unitPrice:Number,total:Number}],
    user:{type:Schema.Types.ObjectId,ref:'User'},
    paymentType:{type:String,default:'COD'},
    paymentInfor:{type:String},
    shippingFee:{type:Number,default:2},
    status:{type:Boolean,default:false},
    code:{type:String},
    discount:{type:Number,default:0},
    sum:{type:Number,required:true},
    tel:{type:String,required:true},
    location:{type:String,required:true},
},{timestamps:true});
module.exports=mongoose.model('Order',Order)