const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin=new Schema({
    adminname:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    gmail:{type:String,required:true},
    name:{type:String ,require:true},
},{timestamps:true})
module.exports=mongoose.model('Admin',Admin)