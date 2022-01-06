const mongoose = require('mongoose');
connect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            
        })
        console.log('connect database successfully')
    }catch(err){
        console.log(err)
    }

}
module.exports={connect}