const slug = require('mongoose-slug-generator');
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const ObjectId = Schema.ObjectId;
mongoose.plugin(slug);
const Product=new Schema({
    name:{required:true,type:String},
    price:{type:Number,required:true},
    pricePromotion:{type:Number},
    des:{type:String},
    info:[{color:{type:String},size:{type:String},quantity:{type:Number},_id:false}],
<<<<<<< HEAD
=======
    type:[{type:String}],
>>>>>>> 61d1adb02013374a74fc2406e9581efcffbb8e17
    gender:[{type:String}],
    imagesUrl:[{type:String}],
    rating:{point:Number,quantity:Number},
    categoryId:[{type:Schema.Types.ObjectId,ref:'Category'}],
    slug:{type:String,slug:"name",unique:true},
},{timestamps:true})


Product.plugin(mongoose_delete,{ overrideMethods: 'all' });
module.exports=mongoose.model('Product',Product)