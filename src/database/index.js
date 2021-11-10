const mongoose = require('mongoose');
connect=async()=>{
    try{
        await mongoose.connect('mongodb+srv://phat_trien_ud_web:thangvanguyet@cluster0.znme0.mongodb.net/localbrand_db_dev',{
            
        })
        console.log('connect database successfully')
    }catch(err){
        console.log(err)
    }

}
module.exports={connect}