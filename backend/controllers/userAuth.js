const userAuth = require("../models/User_Auth");
const nodemailer = require('nodemailer')
const nodeoutlook = require('nodejs-nodemailer-outlook')
const fs = require('fs');
var path = require('path');

const {
  registerValidation,
  logInValidation,
} = require("./validations/validations");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verify = require("../controllers/validations/verifyToken");

// *@desc register User
// *@route POST /api/userAuth/register
// *@acces Public
exports.registerUser = async (req, res) => {
  const error = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const emailExist = await userAuth.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email already exsists");
    }
  } catch (error) {
    console.log(error);
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new userAuth({
    ...req.body,
    password: hashedPassword,
  });
  try {
   
 
    //Send Mail


    await jwt.sign({ _id: user._id }, process.env.EMAIL_SECRET,{expiresIn:"1d"},(err,emailToken)=>{
  
       const emailUrl =`${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${emailToken}`


   
       const transporter = nodemailer.createTransport({
              service: 'hotmail',
            //   secureConnection: false,
            //   port:  995,
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



      const new_user = await user.save();
      res.send({ user: user._id });
  } catch (err) {
    console.log(err)
    res.status(400).send({
      msg: err,
    });
  }
};


// *@desc validete User email
// *@route GET /api/userAuth/register/confirmation/:token
// *@acces Public

exports.validateEmail = async (req,res)=>{
  try{
    const {_id} = jwt.verify(req.params.token,process.env.EMAIL_SECRET)
    const user = await userAuth.findById(_id)
   
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

// *@desc login User returns JWT
// *@route POST /api/userAuth/login
// *@acces Public
exports.loginUser = async (req, res) => {
  const error = logInValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {


    const user = await userAuth.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password/E"); //! TODO REMOREgit  E and P
    }
    //Check Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
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

