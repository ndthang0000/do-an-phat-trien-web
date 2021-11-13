const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User=new Schema({
    username:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    gmail:{type:String,required:true},
    name:{type:String ,require:true},
    location:{type:String,required:true},
    avatarUrl:{type:String},
    listProductHasBuy:[{type:Schema.Types.ObjectId,ref:'Product'}]
},{timestamps:true})
module.exports=mongoose.model('User',User)