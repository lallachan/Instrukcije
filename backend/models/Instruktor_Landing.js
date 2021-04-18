const mongoose = require("mongoose");

const InstruktorLanding = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    lastName:{
        type:String,
        required:true,
        default:"Prezime",
        min:2,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    desc:{
        type:String,
        required:true,
        min:50,
        max:1024,
    },
    tags:{
        type:Array,
        required:true,
        default:["Matematika","Hrvatski"] // TODO REMOVE THIS
    }

})

module.exports = mongoose.model('InstruktorLanding',InstruktorLanding)