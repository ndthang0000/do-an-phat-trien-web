const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Comment=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    username:{type:String},
    product:{type:Schema.Types.ObjectId,required:true},
    content:{type:String},
},{timestamps:true})
module.exports=mongoose.model('Comment',Comment)