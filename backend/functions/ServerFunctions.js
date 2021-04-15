const Inst_L = require("../models/Instruktor_Landing");
const User = require("../models/User");

async function  SetLandingInstructors  () {
    //TODO TAKE ONLY INSTRUCTORS
    const users = await User.find({})
    users.forEach(user =>{
        const {name,email} = user
        const instruktor = new Inst_L({
            name,email,
            desc:"Opis"
        })

        instruktor.save()
    })
}

module.exports.SetLandingInstructors = SetLandingInstructors