const { required } = require("joi");
const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');

const mongoosePaginate = require('mongoose-paginate-v2');

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
        default:null
    },
    ratedUsers:{
        type:[String],
        default:[]
    },
    reviewedUsers:{
        type:[String],
        default:[]
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
    },
    comments:[
       { user:{
            _id:{
                type:String,
                min:24,
                max:24
            },
            firstName:{
                type:String,
                min:6,
                max:255
            } ,
             lastName:{
                type:String,
                min:6,
                max:255
            },
            imageUrl:{
                type:String,
                default:null
            },
        },
        comment:{
            type:String
        },
        created_at:{
            type:Date,
            default:Date.now
        }
    }
    ]


})
Insturktor_Schema.plugin(mongoosePaginate);

module.exports.Instruktor = mongoose.model('Instruktor',Insturktor_Schema)
module.exports.userAuth = mongoose.model('User_Auth',User_AuthSchema)


