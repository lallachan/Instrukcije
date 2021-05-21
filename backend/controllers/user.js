const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const geocoder = require('../utills/geocoder')

const {
    userUpdateValidation, instruktorRatingValidaiton, instruktorReviewValidation
  } = require("./validations/validations");
const { Instruktor } = require("../models/User_Auth");
const { getUserColletion } = require("./validations/verifys");
  

//? USER DATA FUNCTIONS   ----------START

// *@desc login User returns User Data
// *@route GET /api/user
// *@acces Private (JWT Header)
exports.getUserData = async (req,res)=>{
    try{
        const user = await req.Model.findById(req.user_id).select(["-password" ,"-emailVerifed","-__v","-_id"])
       
       
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
    }

}



exports.addReview = async (req,res)=>{ 
    
    const error = instruktorReviewValidation(req.body)
    if(error){
      return res.status(400).send(error.details[0].message);
    }

    try {

       //*CHECK IF INSTRUKTOR Exsists
        const reviewed_instruktor = await Instruktor.findById(req.param_id);
        if(reviewed_instruktor == null){
            return res.status(400).send(`Can not rate user with id: ${req.param_id}`);
        }


        //*CHECK IF USER DID ALREADY RATE 
        const user_that_reviews = await req.Model.findById(req.user_id)
        if(user_that_reviews.reviewedUsers.includes(req.param_id)){
            throw Error(`User (ID: ${req.user_id}) has already reviewED this instruktor(Instruktor ID: ${req.param_id}) `)
        }   

        console.log(user_that_reviews.firstName)
        //*Crete New Review
        const  comment = {
            user:{
                _id:user_that_reviews._id,
                firstName:user_that_reviews.firstName,
                lastName:user_that_reviews.lastName,
                imageUrl:user_that_reviews.imageUrl
            },
            comment:req.body.desc,
            created_at:Date.now()
        }


        console.log(comment)


        //*Add Comment TO Instruktor
        reviewed_instruktor.comments.push(comment)

         //*Add that this user has reviewed this INSTURKOTR
         user_that_reviews.reviewedUsers.push(reviewed_instruktor._id)

         //Save
         await reviewed_instruktor.save()
         await user_that_reviews.save()


        res.status(200).send("Succesfully reviewed")
        
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }

}

exports.addRating = async (req,res)=>{    
 
    const error = instruktorRatingValidaiton(req.body)
    if(error){
      
 
      return res.status(412).send(error.details[0].message);
    }
  
    try{

        //*CHECK IF INSTRUKTOR Exsists
        const rated_instruktor = await Instruktor.findById(req.param_id);
        if(rated_instruktor == null){
            
            return res.status(400).send(`Can not rate user with id: ${req.param_id}`);
        }


         //*CHECK IF USER DID ALREADY RATE 
        const user_that_rates = await req.Model.findById(req.user_id)
        if(user_that_rates.ratedUsers.includes(req.param_id)){
           
            throw Error(`User (ID: ${req.user_id}) has already rated this instruktor(Instruktor ID: ${req.param_id}) `)
        }   
    
       
        //*Change Instruktor Rating
        let new_rating;

        if(rated_instruktor.timesRated==0){new_rating = req.body.grade}

        new_rating= Number.parseFloat(Number.parseFloat(rated_instruktor.timesRated*rated_instruktor.rating) + Number.parseInt(req.body.grade))  / Number.parseInt(rated_instruktor.timesRated+1).toFixed(2)

        rated_instruktor.timesRated +=1

        rated_instruktor.rating = new_rating
    
        //*Add that this user has rated this INSTURKOTR
        user_that_rates.ratedUsers.push(req.param_id) 


        //*SAVE CHANGES
        await rated_instruktor.save()
        await user_that_rates.save()
        
        res.status(200).send(`User (ID: ${req.user_id}) has succefully rated this instruktor(Instruktor ID: ${req.param_id}) `)
    
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
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
    const user = await req.Model.findById(req.user_id)
    if(req.body.tags != undefined){
        req.body.tags = [...req.body.tags.map(tag=>tag.trim().toLowerCase()),...user.tags]
    }
    await req.Model.findByIdAndUpdate(req.user_id,{...req.body}).exec()
    return res.status(200).send("Updated Succesfully")
  } catch (error) {
      console.log(error)
  }
 

}


//? USER DATA FUNCTIONS   ----------END