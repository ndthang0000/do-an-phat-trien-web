const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User=new Schema({
    username:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    gmail:{type:String,required:true,unique:true},
    name:{type:String ,require:true},
    address:{type:String,required:true},
    gender:{type:String},
    avatarUrl:{type:String, default:'/img/avatar.png'},
    isAuth:{type:Boolean,default:false},
},{timestamps:true})
module.exports=mongoose.model('User',User)