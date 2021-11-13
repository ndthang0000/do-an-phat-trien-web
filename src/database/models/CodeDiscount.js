const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const CodeDiscount=new Schema({
    code:{type:String,required:true},
    value:{type:Number,required:true},
    deadline:{type:Date,required:true},
},{timestamps:true})
module.exports=mongoose.model('CodeDiscount',CodeDiscount)