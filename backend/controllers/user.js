const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const {
    userUpdateValidation
  } = require("./validations/validations");
  

//? USER DATA FUNCTIONS   ----------START

// *@desc login User returns User Data
// *@route GET /api/user
// *@acces Private (JWT Header)
exports.getUserData = async (req,res)=>{
    try{
        const user = await req.Model.findById(req.user_id).select(["-password" ,"-emailVerifed","-location","-__v","-_id"])
       
       
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
    }

}



exports.addReview = async (req,res)=>{ 
    console.log("hey")
    return res.json({})

}

exports.addRating = async (req,res)=>{ 
    console.log("hey")
    return res.json({})

}

// *@desc update User image 
// *@route PUT /api/user/updateImage
// *@acces Private (JWT Header)
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

// *@desc update User data (excluding email and password)
// *@route PUT /api/user/updateData
// *@acces Private (JWT Header)
exports.updateUserData = async (req,res)=>{
   const error =  userUpdateValidation(req.body)

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
 
    const user = await req.Model.findByIdAndUpdate(req.user_id,{...req.body}).exec()
    return res.status(200).send("Updated Succesfully")
  } catch (error) {
      console.log(error)
  }
 

}


//? USER DATA FUNCTIONS   ----------END