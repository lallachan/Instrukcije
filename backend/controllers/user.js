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

exports.updateUserImage = async (req,res)=>{
  
    try {
        const user = await req.Model.findById(req.user_id)
 
        if(!req.body.imageUrl) return res.status(400).send("imageUrl missing")

        user.imageUrl = req.body.imageUrl
        await user.save()
        res.status(200).send("Image Upload Successfully")
    } catch (error) {
        console.log(err)
    }
}

//? USER DATA FUNCTIONS   ----------END