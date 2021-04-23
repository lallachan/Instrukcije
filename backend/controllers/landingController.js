const Instruktor_Landing = require("../models/Instruktor_Landing");

exports.lading = async (req,res)=>{
    
    try{
        const IL =  await Instruktor_Landing.find({})
        res.status(200).send(IL)
    }catch(err){
        res.status(401).send(err)
    }
}