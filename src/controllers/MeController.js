
const {User,Category, Order,Product}=require('../database')
const {MongooseToObject, MultipleMongooseToObject}=require('../ultil/mongoose')
const argon2=require('argon2')

const index=async(req,res)=>{
    const category=await Category.find({})
    res.render('profile',{
        category:MultipleMongooseToObject(category)
    })
}
const editPassword=async(req,res)=>{
    const category=await Category.find({})
    res.render('profile-edit-password',{
        category:MultipleMongooseToObject(category)
    })
}
const saveEditPassword=async(req,res)=>{
    const {currentPassword,newPassword}=req.body
    
    try{
        const category=await Category.find({})
        let isValidPassword=await argon2.verify(req.user.password,currentPassword)
        if(isValidPassword){
            const user=await User.findById(req.user._id)

            user.password=await argon2.hash(newPassword)
            
            await user.save()
            return res.render('profile',{
                message:'Change password successfully',
                category:MultipleMongooseToObject(category)
            })
        }
        else{
            res.render('profile-edit-password',{message:'Current password is wrong !! '})
        }
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}
const editAvatar=async(req,res)=>{
    const category=await Category.find({})
    res.render('edit-avatar',{
        category:MultipleMongooseToObject(category)
    })
}
const saveEditAvatar=async(req,res)=>{
    const category=await Category.find({})
    const user=await User.findById(req.user._id)
    if(user){
        user.avatarUrl='/uploads/'+req.file.filename
    }
    await user.save()
    res.render('profile',{
        user:MongooseToObject(user),
        category:MultipleMongooseToObject(category)
    })
}
const history=async(req,res)=>{
    const category=await Category.find({})
    const allOrder=await Order.aggregate([
        {
            $lookup: {
                from: "order_details", // collection name in db
                localField: "_id",
                foreignField: "orderId",
                as:'orderId'
            },
        },
        {
            $match:{
            user:req.user._id
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        }
    ])
    for(let i=0;i<allOrder.length;i++){
        for(let j=0;j<allOrder[i].orderId.length;j++){
            let productInfor=await Product.findOne({_id:allOrder[i].orderId[j].productId}).sort({'createdAt':-1})
            allOrder[i].orderId[j].product=productInfor.toObject()
        }
    }
    res.render('history',{
        category:MultipleMongooseToObject(category),
        allOrder:allOrder,
    })
}

module.exports={
    index,
    editPassword,
    saveEditPassword,
    editAvatar,
    saveEditAvatar,
    history
}