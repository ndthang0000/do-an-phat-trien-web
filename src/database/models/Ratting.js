const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Ratting=new Schema({
    user:{type:Schema.Types.ObjectId, required:true},
    product:{type:Schema.Types.ObjectId,required:true},
    content:{type:String},
    point:{type:Number,min:1,max:5}
},{timestamps:true})
module.exports=mongoose.model('Ratting',Ratting)