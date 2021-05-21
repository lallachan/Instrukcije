const {userAuth,Instruktor} = require("../models/User_Auth")
const mongoose = require("mongoose");
const nodemailer = require('nodemailer')
const geocoder = require('../utills/geocoder')
const fs = require('fs');
var path = require('path');

const {
  registerValidation,
  logInValidation,registerInstruktorValidation

} = require("./validations/validations");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {verifyToken,verifyEmail} = require("./validations/verifys")


//? REGISTER FUNCTION  ---- START

// *@desc register User
// *@route POST /api/userAuth/register
// *@acces Public
exports.registerUser = async (req, res) => {

  const error = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const NEW_ID =   await new mongoose.mongo.ObjectId();
  try {
    //Verify if email already exists
    if(await verifyEmail(req.body.email)){
      return res.status(400).send("Email is already in use")
    }

  } catch (error) {
    console.log(error);
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try{

    const data = req.body
  
  const user = await new userAuth({
    ...data,
    password: hashedPassword,
    _id : NEW_ID
  });
  await jwt.sign({ _id: NEW_ID }, process.env.EMAIL_SECRET,{expiresIn:"1d"},(err,emailToken)=>{
  
    const emailUrl =`${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${emailToken}`



    const transporter = nodemailer.createTransport({
           host: 'smtp.elasticemail.com',
         //   secureConnection: false,
           port:  2525,
         //   tls: {
         //     ciphers:'SSLv3'
         //  },
           auth: {
             user: process.env.EMAIL_NAME,
             pass: process.env.EMAIL_PASS,
           },
         })

       transporter.sendMail({
       from: process.env.EMAIL_NAME,
       to:  req.body.email,
       subject: 'Confirm Email',
       html: `Please click this email to confirm your email: <a href="${emailUrl}">${emailUrl}</a>`,
       text: `Please clik to confirm your email: ${emailUrl}`
     });
    

   
 });

 user.save()
 return res.status(200).json({id:user._id})
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};


// *@desc register Instruktor
// *@route POST /api/userAuth/registerInstruktor
// *@acces Public
exports.registerInstruktor= async (req,res)=>{
  const error = registerInstruktorValidation(req.body)
 
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  const NEW_ID =   await new mongoose.mongo.ObjectId();

  try{

  //Verify if email already exists
  if(await verifyEmail(req.body.email)){
    return res.status(400).send("Email is already in use")
  }

  const data = req.body
  // Location 
  const loc = await geocoder.geocode({ address: data.address,zipcode:data.zip,city:data.city,country:"Hrvatska"})
  data.location ={
      type:'Point',
      coordinates:[loc[0].longitude,loc[0].latitude],
      formattedAdress:loc[0].formattedAddress,
      city:loc[0].city
  }

  

  //hash password
  const salt = await bcrypt.genSalt(10);
  
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  data.tags = data.tags.map(tag=>tag.trim().toLowerCase())
  
  const user = await new Instruktor({
    ...data,
    password: hashedPassword,
    _id : NEW_ID
  });
  await jwt.sign({ _id: NEW_ID }, process.env.EMAIL_SECRET,{expiresIn:"1d"},(err,emailToken)=>{
  
    const emailUrl =`${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${emailToken}`



    const transporter = nodemailer.createTransport({
           host: 'smtp.elasticemail.com',
         //   secureConnection: false,
           port:  2525,
         //   tls: {
         //     ciphers:'SSLv3'
         //  },
           auth: {
             user: process.env.EMAIL_NAME,
             pass: process.env.EMAIL_PASS,
           },
         })

       transporter.sendMail({
       from: process.env.EMAIL_NAME,
       to:  req.body.email,
       subject: 'Confirm Email',
       html: `Please click this email to confirm your email: <a href="${emailUrl}">${emailUrl}</a>`,
       text: `Please clik to confirm your email: ${emailUrl}`
     });
    

   
 });

 user.save()
 return res.status(200).json({id:user._id})

  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
2525
}


// *@desc validete User email
// *@route GET /api/userAuth/register/confirmation/:token
// *@acces Public
exports.validateEmail = async (req,res)=>{


  try{
  
    const user = await req.Model.findById(req.user_id)
   
    if(user.emailVerifed == false){
      return res.status(200).send("Email already verifed")
    }

    user.emailVerifed = true
    await user.save()

    let data = fs.readFileSync(path.join(__dirname + '/emailValid.html'), 'utf8');
    if(data)return res.send(data.replace('url',`${req.protocol}://${req.get('host')}`));
    

  }catch(err){
    console.log(err)
    res.send(err)
  }
 
  
}

//? REGISTER FUNCTION  ---- END








//? LOGIN FUNCTIONS  ---- START



// * helper


// *@desc login User returns JWT
// *@route POST /api/userAuth/login
// *@acces Public
exports.loginUser = async (req, res) => {
  const error = logInValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {


    let user = await userAuth.findOne({ email: req.body.email });
    if(!user){
       user = await Instruktor.findOne({ email: req.body.email });
    }
    if (!user) {
      return res.status(400).send("Invalid email or password/E"); //! TODO REMOREgit  E and P
    }
    
  
    //Check Password
    const validPass= await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).send("Invalid email or password/P"); //! TODO REMORE E and P
    }

  if(user.emailVerifed == "false"){
    return res.status(428).send("Email is not verifed")
  }

    //Create and assign Token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (error) {
    console.log(error);
  }
};

//? LOGIN FUNCTIONS  ---- END


