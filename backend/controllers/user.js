const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const {
    userUpdateValidation, instruktorRatingValidaiton
  } = require("./validations/validations");
const { Instruktor } = require("../models/User_Auth");
  

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
    const error = instruktorRatingValidaiton(req.body)
    if(error){
      return res.status(400).send(error.details[0].message);
    }

    try {

        const rated_instruktor = await Instruktor.findById(req.user_id);
        if(rated_instruktor == null){
            return res.status(400).send(`Can not rate user with id: ${req.user_id}`);
        }
        
        let new_rating;

        if(rated_instruktor.timesRated==0){new_rating = req.body.grade}

        new_rating= Number.parseFloat(Number.parseFloat(rated_instruktor.timesRated*rated_instruktor.rating) + Number.parseInt(req.body.grade))  / Number.parseInt(rated_instruktor.timesRated+1).toFixed(2)

        rated_instruktor.timesRated +=1

        rated_instruktor.rating = new_rating


        await rated_instruktor.save()

        console.log(rated_instruktor)
        res.status(200).send("ratedSuccefully")
    
    } catch (error) {
        console.log(error)
    }

}

// *@desc update User image 
// *@route PUT /api/user/updateImage
// *@acces Private (JWT Header)
exports.updateUserImage = async (req,res)=>{
  
    try {
        const user = await req.Model.findById(req.user_id)
 
        if(!req.body.imageUrl) return res.status(400).send("imageUrl missing")

        user.imageUrl = req.body.imageUrl
        console.log( user.imageUrl)
        await user.save()
        return res.status(200).send("Image Upload Successfully")
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
    const {address,zip} = req.body
    const loc = await geocoder.geocode({ address: address,zipcode:zip,country:"Hrvatska"})
    req.body.location ={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAdress:loc[0].formattedAddress,
        city:loc[0].city
    }
    const user = await req.Model.findByIdAndUpdate(req.user_id,{...req.body}).exec()
    return res.status(200).send("Updated Succesfully")
  } catch (error) {
      console.log(error)
  }
 

}


//? USER DATA FUNCTIONS   ----------END