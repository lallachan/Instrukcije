const Inst_L = require("../models/Instruktor_Landing");
const User_Auth = require("../models/User_Auth");


exports.SetLandingInstructors=  async  ()=> {
    //TODO TAKE ONLY INSTRUCTORS
    const users = await User_Auth.find({})
    users.forEach(user =>{
        const {firstName,lastName,email} = user
        const instruktor = new Inst_L({
            firstName,lastName,email,
            desc:"Opis"
        })

        instruktor.save()
    })
}

