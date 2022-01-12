const {Category, Cart,Order,OrderDetail, Product}=require('../database')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
const {sendMail}=require('../ultil')

const index=async(req,res)=>{
    const category=await Category.find({})
    let cart
    if(req.user){
        cart=await Cart.find({user:req.user._id}).populate('product')
    }
    else{
        cart=[]
    }
    res.render('check-out',{
        cart:JSON.stringify({cart:cart}),
        category:MultipleMongooseToObject(category)
    })
}
const newOrder=async(req,res)=>{
    if(req.user){
        const cart=await Cart.find({user:req.user._id}).populate('product')
        let sum=0;
        let quantity=0;
        for(let i=0;i<cart.length;i++){
            quantity+=cart[i].infor.length
            for(let j=0;j<cart[i].infor.length;j++){
                sum+=cart[i].infor[j].quantity*cart[i].product.pricePromotion;
            }
        }
        let newOrder=new Order({
            ...req.body,
            user:req.user._id,
            sum,
            quantity
        })
        await newOrder.save()
        for(let i=0;i<cart.length;i++){
            for(let j=0;j<cart[i].infor.length;j++){
                const newOrderDetail=new OrderDetail({
                    productId:cart[i].product._id,
                    orderId:newOrder._id,
                    infor:{
                        quantity:cart[i].infor[j].quantity,
                        size:cart[i].infor[j].size
                    }
                })
                await newOrderDetail.save()
            }
        }
        newOrder=newOrder.toObject()
        await Cart.deleteMany({user:req.user._id})
        let allDetailOrder=await OrderDetail.find({orderId:newOrder._id}).populate('productId')
        newOrder['product']=allDetailOrder
        await sendMail(newOrder)
        res.status(200).json({success:true})
    }
    else{
        try{
            let sum=0;
            for(let i=0;i<req.body.cart.cart.length;i++){
                let findProduct=await Product.findOne({_id:req.body.cart.cart[i].product})
                if(findProduct){  
                    sum+=findProduct.pricePromotion*req.body.cart.cart[i].infor.quantity
                }
            }
            let newOrder=new Order({
                ...req.body,
                sum,
                quantity:req.body.cart.cart.length
            })
            await newOrder.save()
            for(let i=0;i<req.body.cart.cart.length;i++){
                let findProduct=await Product.findOne({_id:req.body.cart.cart[i].product})
                if(findProduct){
                    const newDetailOrder=new OrderDetail({
                        orderId:newOrder._id,
                        productId:req.body.cart.cart[i].product,
                        infor:{
                            quantity:req.body.cart.cart[i].infor.quantity,
                            size:req.body.cart.cart[i].infor.size
                        }
                    })  
                    console.log(' vo day')
                    console.log(newDetailOrder)
                    await newDetailOrder.save()
                }
            }
            newOrder=newOrder.toObject()
            let allDetailOrder=await OrderDetail.find({orderId:newOrder._id}).populate('productId')
            console.log(allDetailOrder)
            newOrder['product']=allDetailOrder
            console.log(newOrder)
            await sendMail(newOrder)
            res.status(200).json({success:true})
        }catch(e){
            res.status(400).json({success:false})
        }
        
    }
}

module.exports={
    index,
    newOrder
}