const mongoose = require("mongoose");

const User_AuthSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:6,
        max:255
    } ,
     lastName:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    emailVerifed:{
        type:String,
        default:false,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User_Auth',User_AuthSchema)