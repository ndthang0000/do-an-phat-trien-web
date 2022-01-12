
const {Cart,Category,Product}=require('../database')
const {MultipleMongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    const category=await Category.find({})
    let cart=[];
    if(req.user){
        cart=await Cart.find({user:req.user._id}).populate('product')
    }
    console.log(cart)
    res.render('cart',{
        cart:JSON.stringify({cart}),
        category:MultipleMongooseToObject(category)
    })
}
const add=async(req,res)=>{
    let {id,user,quantity,size}=req.body
    if(!id||!user){
        return res.status(400).json({success:false,message:'Invalid Id'})
    }
    const existCart=await Cart.findOne({user:user,product:id})
    if(existCart){
        let checkCart=false
        existCart.infor.forEach(item=>{
            if(item.size===size){
                item.quantity+=quantity
                checkCart=true
            }
        })
        if(!checkCart){
            existCart.infor.push({size,quantity})
        }
        await existCart.save()
        return res.status(200).json({success:true})
    }
    else{
        const newCart=new Cart({
            user:user,
            product:id,
            infor:[{size,quantity}]
        })
        await newCart.save()
        return res.status(200).json({success:true})
    }
}
const getLength=async(req,res)=>{
    if(!req.user){
        return res.status(200).json({cartlength:0})
    }
    let cartLength=0
    const cart=await Cart.find({user:req.user._id})
    cart.forEach(item=>{
        cartLength+=item.infor.length
    })
    res.status(200).json({length:cartLength})
}
const update=async(req,res)=>{
    let {id,type,size}=req.body
    let cart=await Cart.findOne({_id:id})
    switch (type)
    {
        case 'ADD':
            cart.infor.forEach(item=>{
                if(item.size===size){
                    item.quantity+=1
                }
            })
            await cart.save()
            res.status(200).json({success:true})
            break
        case 'SUB':
            cart.infor.forEach(item=>{
                if(item.size===size){
                    item.quantity-=1
                }
            })
            await cart.save()
            res.status(200).json({success:true})
            break
        case 'DEL':
            if(cart.infor.length===1){
                await Cart.deleteOne({_id:id})
            }
            else{
                cart.infor=cart.infor.filter(item=>{
                    return item.size!==size
                })
                await cart.save()
            }
            res.status(200).json({success:true})
            break
        default:
            res.status(400).json({success:false})
    }
}
const getProduct=async(req,res)=>{
    let {product}=req.body
    const allProduct=await Product.find({_id:product})
    res.status(200).json({allProduct,success:true})
}


module.exports={
    index,
    add,
    getLength,
    update,
    getProduct
}
