const slug = require('mongoose-slug-generator');
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.plugin(slug);
const Product=new Schema({
    name:{required:true,type:String},
    price:{type:Number,required:true},
    pricePromotion:{type:Number},
    des:{type:String},
    info:[{color:{type:String},size:{type:String},quantity:{type:Number},_id:false}],
    type:{type:String},
    gender:[{type:String}],
    imagesUrl:[{type:String}],
    rating:{point:Number,quantity:Number},
    slug:{type:String,slug:"name",unique:true},
},{timestamps:true})
module.exports=mongoose.model('Product',Product)