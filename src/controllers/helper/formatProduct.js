const formatProduct=(product)=>{  // format product
    product.quantity=product.info.reduce((total,item)=>{
        return total+item.quantity
    },0)
    product.discount=parseInt(100-(product.pricePromotion/product.price)*100)
}
module.exports=formatProduct