const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');


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
    },
    imageUrl:{
        type:String,
        default:"../images/avatar.png"
    }
})



const Insturktor_Schema = extendSchema(User_AuthSchema,{
    desc:{
        type:String,
        required:true,
        max:5000,
        min:50,
    },
    phoneNumber:{
        type:String,
        required:true,
        max:30,
        min:5
    },
    address:{
        type:String,
        required:[true,'Please add an address'],
        max:50
    },
    zip:{
        type:String,
        required:[true,'Please add an Zip'],
    },
    city:{
        type:String,
        required:true,
    },
    tags:{
        type:[String]
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
        },
        coordinates:{
            type:[Number],
            index: '2dsphere'
        },
        formattedAdress:String,
        city:String
    },
    rating:{
        type:Number,
        default:0
    },
    timesRated:{
        type:Number,
        default:0
    }


})

module.exports.Instruktor = mongoose.model('Instruktor',Insturktor_Schema)
module.exports.userAuth = mongoose.model('User_Auth',User_AuthSchema)


