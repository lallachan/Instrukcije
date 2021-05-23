const mongoose = require("mongoose");

const { Instruktor } = require("../models/User_Auth");
const { searchParamsValidation } = require("./validations/validations");

exports.seachInstruktors = async (req, res) => {
  try {
    const error = searchParamsValidation(req.body)
    if(error){
        throw Error(`${error.details[0].message}`)
    }

    //*TOOD limit by location
    // ** Limit by city

    //         //** Limit by location */

    let findObj = {};
    if (req.body.city !== undefined) {
      findObj.city = req.body.city;
    }
    // //!! TODO LOCATION SEARCH
    // if (req.body.location !== undefined) {
    //   findObj.location = req.body.location;
    // }

    //find by
    const instruktors = await Instruktor.find(findObj)
      .select(["-password", "-emailVerifed", "-__v","-comments","-date","-reviewedUsers","-ratedUsers"])
      .all("tags", req.body.param)
      .sort({ rating: -1 })
      .limit(20)
      .exec()
    console.log(instruktors);

    return res.status(200).send(instruktors);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


exports.seachByLocation = async(req,res) =>{
    //TODO
}