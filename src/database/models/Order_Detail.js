const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Order_Detail=new Schema({
    productId:{type:Schema.Types.ObjectId,ref:'Product',required:'true'},
    orderId:{type:Schema.Types.ObjectId,ref:'Order',required:'true'},
    infor:{
        quantity:{type:Number},
        size:{type:String}
    }
})
module.exports=mongoose.model('Order_Detail',Order_Detail)