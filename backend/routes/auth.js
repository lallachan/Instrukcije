const router = require("express").Router();
const User = require("../models/User");
const {
  registerValidation,
  logInValidation,
} = require("../validations");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



router.post("/register", async (req, res) => {
  const error = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check for same email
  const emailExist = await User.findOne({email:req.body.email})
  if(emailExist){
      return res.status(400).send("Email already exsists")
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password,salt)


  const user = new User({
    ...req.body,
    password:hashedPassword
  });
  try {
    const new_user = await user.save();
    res.send({user:user._id});
  } catch (err) {
    res.status(400).send({
      msg: err,
    });
  }
});


router.post("/login", async (req,res)=>{
    const error = logInValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
        }
    
    //Check if user has REQ email 
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("Invalid email or password/E")
    }

    //Check Password
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass){
        return res.status(400).send("Invalid email or password/P")
    }

    //Create and assign Token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)


    

});

module.exports = router;
