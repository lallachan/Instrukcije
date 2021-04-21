const mongoose = require("mongoose")

async function  connect_to_DB () {
    
    try{
        const conn = await mongoose.connect(process.env.DB_CONNECT,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true,
        }) 
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.log(err)
    }
} 
module.exports = connect_to_DB


