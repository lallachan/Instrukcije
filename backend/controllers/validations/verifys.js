const jwt = require("jsonwebtoken")
const {userAuth,Instruktor} = require("../../models/User_Auth")

module.exports.verifyToken = function (req,res,next) {
    const  token = req.header('auth-token')
    if(!token) return res.status(401).send("Access Denied")

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified;

        //
        next()
    } catch(err){
        res.status(400).send('Invalid Token')
    }
}


module.exports.verifyEmail = async function (email) {

    try{       
   
        let inUse = false
        const userEmailCheck = await userAuth.find({email:email}).exec()

        const instruktorEmailCheck = await Instruktor.find({email:email}).exec()
    
        return userEmailCheck.length!=0 ||instruktorEmailCheck.length !=0 ;
    }catch(err){
        console.log(err)
    }
    
   
}