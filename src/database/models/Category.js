const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Category=new Schema({
    tittle:{type:String,required:true},
    imageUrl:{type:String, default:'/img/courses/1.jpg'}
},{timestamps:true})
module.exports=mongoose.model('Category',Category)