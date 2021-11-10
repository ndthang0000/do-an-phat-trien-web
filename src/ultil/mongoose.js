function MultipleMongooseToObject(obj){
    return obj.map(item=>item.toObject())
}
function MongooseToObject(obj){
    return obj.toObject()
}
module.exports={MultipleMongooseToObject,MongooseToObject}