const router = require("express").Router();
const Instruktor_Landing = require("../models/Instruktor_Landing");


router.get("/",async (req,res)=>{
    const IL =  await Instruktor_Landing.find({})
    try{
        res.status(200).send(IL)
    }catch(err){
        res.status(401).send(err)
    }
})  


module.exports = router;