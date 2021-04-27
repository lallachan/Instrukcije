const jwt = require("jsonwebtoken")
const {userAuth,Instruktor} = require("../../models/User_Auth")

module.exports.verifyToken = function (req,res,next) {
    const  token = req.header('auth-token')

    if(!token) return res.status(401).send("Access Denied")

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user_id= verified._id
        //
        next()
    } catch(err){
        res.status(400).send('Invalid Token')}
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


module.exports.emailConfirmation = function (req,res,next) {
    const  token = req.params.token
    if(!token) return res.status(401).send("Access Denied")

    try{
        const {_id} = jwt.verify(req.params.token,process.env.EMAIL_SECRET)
        req.user_id = _id
        //
        next()
    } catch(err){
        res.status(400).send('Invalid Token')
        }
}

module.exports.getUserColletion = async function (req,res,next) {
    try {
        let user_id = await userAuth.findById(req.user_id)
        if(user_id){
            req.Model = userAuth
            next()
        }

        user_id = await Instruktor.findById(req.user_id)
        if(user_id){
            req.Model = Instruktor
            next()
        }


    } catch (error) {
        console.log(error)
    }

}


module.exports.checkIDparams = function (req,res,next) {
    const  id = req.params.id
    if(!id) return res.status(401).send("Access Denied")
    req.user_id = id
    next()
}

