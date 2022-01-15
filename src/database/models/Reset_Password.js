const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const ResetPassword=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    token:{type:String},
    timeOut:{type:Date}
},{timestamps:true})
module.exports=mongoose.model('ResetPassword',ResetPassword)