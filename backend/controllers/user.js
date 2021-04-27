const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//? USER DATA FUNCTIONS   ----------START
// *@desc login User returns JWT
// *@route POST /api/userAuth/user/:token
// *@acces Private (JWT Header)

exports.getUserData = async (req,res)=>{
    try{
        const user = await req.Model.findById(req.user_id)
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
    }

}

//? USER DATA FUNCTIONS   ----------END