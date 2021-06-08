const { options } = require("joi");
const mongoose = require("mongoose");

const { Instruktor } = require("../models/User_Auth");
const { searchParamsValidation } = require("./validations/validations");

exports.seachInstruktors = async (req, res) => {
  try {
   
    const error = searchParamsValidation(req.body)
    const options  ={
      limit:4,
      page:req.body.page,
      sort : {rating: -1},
      select:["-password", "-emailVerifed", "-__v","-comments","-date","-reviewedUsers","-ratedUsers"],
    }

    
    if(error){

        throw Error(`${error.details[0].message}`)
    }
   
   
    let query = {}
    if(req.body.param != undefined){ 
      query.tags = {$all:[req.body.param.toLowerCase()]}
    }
    
    if(req.body.city != undefined){ 
      query.city = req.body.city
    }
    

    return Instruktor.paginate(query, options, (err,result)=>{
      return res.status(200).send(result)
    })

 

 
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


exports.seachByLocation = async(req,res) =>{
    //TODO
}