
const {Cart}=require('../database')

class CartController{
    async index(req,res){
        
        res.render('cart')
    }
    async add(req,res){
        let {id,user,quantity,size}=req.body
        if(!id||!user){
            return res.status(200).json({success:true,message:'Invalid Id'})
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
            return res.json({success:true})
        }
        else{
            const newCart=new Cart({
                user:user,
                product:id,
                infor:[{size,quantity}]
            })
            await newCart.save()
            return res.json({success:true})
        }
    }
}
module.exports=new CartController
