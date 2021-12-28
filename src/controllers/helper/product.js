const Product=require('../../database/models/Product')
const Category=require('../../database/models/Category')

const findProductList=async (req)=>{
    let {page,key,min,max,type}=req.query
    let slug=req.params.category
    if(!page){
        page=1
    }
    if(!key){
        key=''
    }
    if(min){
        min=parseInt(min.split('$')[1])
    }
    else{
        min=2
    }
    if(max){
        max=parseInt(max.split('$')[1])
    }
    else{
        max=50
    }
    
    if(!type){
        type=[]
    }
    if(!Array.isArray(type)){
        type=[type]
    }
    let allProduct;
    let result={
        quantity:0,
        currenPage:page,
        quantityPage:0,
        resultProduct:[],
        key,
        min,
        max,
        type,
    }
    if(slug){
        const cateItem=await Category.findOne({tittle:slug})
        allProduct=await Product.find({categoryId:cateItem._id,pricePromotion:{$lt:max,$gt:min}})
    }
    else{
        allProduct=await Product.find({pricePromotion:{$lt:max,$gt:min}})
    }
    let filterProduct=[]
    if(key){
        allProduct.forEach(item=>{
            if(item.name.toLowerCase().indexOf(key.toLowerCase())>=0|| 
            item.des.toLowerCase().indexOf(key.toLowerCase())>=0 ) {
                filterProduct.push(item) 
            }
        })
    }
    else{
        filterProduct=allProduct
    }
    
    for(let i=(page-1)*9;i<filterProduct.length&&i<page*9;i++){
        result.resultProduct.push(filterProduct[i])
    }
    result.quantity=filterProduct.length
    result.quantityPage=parseInt((filterProduct.length-1)/9)+1
    if(req.body.sort==='decrease'){
        result.resultProduct.sort((a,b)=>b.pricePromotion-a.pricePromotion)
    }
    if(req.body.sort==='increase'){
        result.resultProduct.sort((a,b)=>a.pricePromotion-b.pricePromotion)
    }
    return result
}

module.exports={
    findProductList
}

